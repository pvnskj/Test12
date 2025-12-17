(function(global) {
  class LayeredBackground {
    constructor(canvas, options = {}) {
      this.canvas = canvas;
      this.parent = canvas.parentElement;
      this.opts = Object.assign({
        colors: ['#60a5fa', '#8b5cf6'],
        density: 160,
        size: 0.05,
        pulses: 2,
        pulseColor: '#10b981',
        lineColor: '#60a5fa',
        depth: 5,
        cameraBase: 6,
        zoomAmount: 1,
        motion: 1,
        parallax: 0.45
      }, options);
      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
      this.camera = new THREE.PerspectiveCamera(55, 1, 0.1, 120);
      this.camera.position.set(0, 0.2, this.opts.cameraBase);
      this.mouse = { x: 0, y: 0 };
      this.scrollProgress = 0;
      this.groups = {
        fabric: new THREE.Group(),
        signals: new THREE.Group()
      };
      this.scene.add(this.groups.fabric);
      this.scene.add(this.groups.signals);
      this.pulses = [];
      this.setup();
    }

    setup() {
      const { colors, density, size, lineColor, pulses, pulseColor } = this.opts;

      colors.forEach((color, idx) => {
        const count = Math.max(40, Math.floor(density * (1 - idx * 0.2)));
        this.groups.fabric.add(this.createPoints(color, count, 6 - idx, idx * -0.15));
      });

      if (this.opts.lines !== false) {
        this.createLines(lineColor);
      }

      for (let i = 0; i < pulses; i++) {
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.14, 28, 28), new THREE.MeshBasicMaterial({
          color: pulseColor,
          transparent: true,
          opacity: 0.26
        }));
        mesh.position.set((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.8);
        this.groups.signals.add(mesh);
        this.pulses.push(mesh);
      }

      this.scene.add(new THREE.AmbientLight('#ffffff', 0.5));
      const light = new THREE.PointLight(colors[0], 0.9, 30);
      light.position.set(3, 4, 8);
      this.scene.add(light);

      this.handleResize();
      window.addEventListener('resize', () => this.handleResize());
      this.bindInteractions();
      this.animate();
    }

    createPoints(color, count, spread, offsetY = 0) {
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * spread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.5 + offsetY;
        positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        color,
        size: this.opts.size,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      return new THREE.Points(geo, mat);
    }

    createLines(color) {
      const curves = [
        new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(-2.4, -0.5, -1.4),
          new THREE.Vector3(0, 1.1, 0),
          new THREE.Vector3(2.3, 0.5, 1.1)
        ),
        new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(-2.6, 0.9, 1.1),
          new THREE.Vector3(0, -0.8, 0),
          new THREE.Vector3(2.2, -0.2, -1.1)
        )
      ];

      curves.forEach((curve, idx) => {
        const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(60));
        const mat = new THREE.LineBasicMaterial({
          color: idx === 0 ? color : this.opts.colors[1] || color,
          transparent: true,
          opacity: 0.55
        });
        this.groups.signals.add(new THREE.Line(geo, mat));
      });
    }

    handleResize() {
      const w = this.canvas.clientWidth;
      const h = this.canvas.clientHeight;
      this.renderer.setSize(w, h, false);
      this.camera.aspect = w / h;
      this.camera.updateProjectionMatrix();
    }

    bindInteractions() {
      const area = this.parent || this.canvas;
      area.addEventListener('pointermove', (e) => {
        const rect = area.getBoundingClientRect();
        this.mouse.x = (e.clientX - rect.left) / rect.width - 0.5;
        this.mouse.y = (e.clientY - rect.top) / rect.height - 0.5;
      });

      const updateScroll = () => {
        const rect = area.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        const progress = 1 - midpoint / window.innerHeight;
        this.scrollProgress = Math.min(Math.max(progress, 0), 1);
      };
      document.addEventListener('scroll', updateScroll, { passive: true });
      updateScroll();
    }

    animate() {
      requestAnimationFrame(() => this.animate());
      const t = performance.now() * 0.001;
      const { motion, parallax, cameraBase, zoomAmount } = this.opts;

      this.groups.fabric.rotation.y += 0.0006 * motion;
      this.groups.signals.rotation.y -= 0.0005 * motion;
      this.groups.fabric.rotation.z = THREE.MathUtils.lerp(this.groups.fabric.rotation.z, this.mouse.x * parallax, 0.08);
      this.groups.signals.rotation.x = THREE.MathUtils.lerp(this.groups.signals.rotation.x, this.mouse.y * parallax, 0.08);

      this.pulses.forEach((p, idx) => {
        p.material.opacity = 0.22 + Math.sin(t * 2 + idx) * 0.16;
        p.scale.setScalar(1 + Math.sin(t * 1.5 + idx) * 0.35);
      });

      const targetX = this.mouse.x * 0.6;
      const targetY = this.mouse.y * 0.4 + (this.scrollProgress - 0.5) * 0.5;
      const targetZ = cameraBase + this.scrollProgress * zoomAmount;
      this.camera.position.x = THREE.MathUtils.lerp(this.camera.position.x, targetX, 0.06);
      this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, targetY, 0.06);
      this.camera.position.z = THREE.MathUtils.lerp(this.camera.position.z, targetZ, 0.04);
      this.camera.lookAt(0, 0, 0);

      this.renderer.render(this.scene, this.camera);
    }
  }

  const presets = {
    hero: {
      colors: ['#60a5fa', '#8b5cf6', '#10b981'],
      density: 320,
      size: 0.055,
      pulses: 3,
      pulseColor: '#10b981',
      lineColor: '#60a5fa',
      cameraBase: 6,
      zoomAmount: 1.2,
      parallax: 0.5
    },
    section: {
      colors: ['#e0ecff', '#dfe7fb'],
      density: 140,
      size: 0.042,
      pulses: 1,
      pulseColor: '#bfdbfe',
      lineColor: '#d0d7ef',
      motion: 0.8,
      cameraBase: 7,
      zoomAmount: 0.6,
      parallax: 0.35
    },
    whitepaper: {
      colors: ['#8ec5ff', '#c7ddff'],
      density: 220,
      size: 0.04,
      pulses: 2,
      pulseColor: '#bae6fd',
      lineColor: '#a5b4fc',
      motion: 0.9,
      cameraBase: 6.5,
      zoomAmount: 0.8,
      parallax: 0.42
    },
    tile: {
      colors: ['#dbeafe', '#e0e7ff'],
      density: 110,
      size: 0.035,
      pulses: 0,
      lines: false,
      motion: 0.7,
      cameraBase: 7.5,
      zoomAmount: 0.5,
      parallax: 0.28
    }
  };

  global.ParticleSurfaces = {
    init(canvas, type = 'section', overrides = {}) {
      const preset = Object.assign({}, presets[type] || presets.section, overrides);
      return new LayeredBackground(canvas, preset);
    }
  };
})(window);
