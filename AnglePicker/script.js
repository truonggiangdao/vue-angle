export default {
  name: 'vue-angle',
  props: {
    angle: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      timer: 0,
      active: false,
      currentAngle: 0,
      rotation: 0,
      startAngle: 0,
      center: { x: 0, y: 0 },
      angleStyle: { transform: 'none' }
    };
  },
  watch: {
    angle(val) {
      if (!this.active) {
        this.currentAngle = val;
        this.updateStyle(val);
      }
    }
  },
  mounted() {
    this.currentAngle = this.angle;
    this.updateStyle(this.angle);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  },
  beforeDestroy() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  },
  methods: {
    /**
     * Update element rotation
     * @param {Number} angle - the current rotate angle deg
     */
    updateStyle(angle) {
      this.angleStyle = { transform: `rotate(${angle}deg)` };
    },
    /**
     * Get bounding rect of a dom element
     * @returns {Object} - the Bounding Client Rect object
     */
    getBoundingClientRect() {
      return this.$refs.circle.getBoundingClientRect();
    },
    /**
     * Calculate current angle base on x, y
     * @param {Number} x - the current x axis
     * @param {Number} y - the current y axis
     * @returns {Number} the angle in deg
     */
    calcAngle(x, y) {
      return (180 / Math.PI) * Math.atan2(y, x);
    },
    /**
     * Get valid number from 0 to 360
     * @param {Number} val - the current angle value
     * @returns {Number}
     */
    getAngleNumber(val) {
      const curVal = val % 360;
      return curVal > 0 ? curVal : 360 - -curVal;
    },
    /**
     * Handle mouse down event
     * @param {MouseEvent} e - the mouse event from user
     */
    onMouseDown(e) {
      e.preventDefault();
      const rect = this.getBoundingClientRect(),
        t = rect.top,
        l = rect.left,
        h = rect.height,
        w = rect.width;
      this.center = {
        x: l + w / 2,
        y: t + h / 2
      };
      const x = e.clientX - this.center.x,
        y = e.clientY - this.center.y;
      this.startAngle = this.calcAngle(x, y);
      this.active = true;
    },
    /**
     * Handle mouse mouse event
     * @param {MouseEvent} e - the mouse event from user
     */
    onMouseMove(e) {
      if (this.active) {
        e.preventDefault();
        this.rotate(e);
      }
    },
    /**
     * Handle mouse up event
     * @param {MouseEvent} e - the mouse event from user
     */
    onMouseUp(e) {
      if (this.active) {
        e.preventDefault();
        this.stop();
      }
    },
    /**
     * Handle rotation
     * @param {MouseEvent} e - the mouse event from user
     */
    rotate(e) {
      e.preventDefault();
      const x = e.clientX - this.center.x,
        y = e.clientY - this.center.y,
        d = this.calcAngle(x, y);
      this.rotation = d - this.startAngle;
      const angle = this.getAngleNumber(this.currentAngle + this.rotation);
      this.updateStyle(angle);
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.emitChange(angle), 100);
    },
    /**
     * Handle stop rotation
     */
    stop() {
      clearTimeout(this.timer);
      this.currentAngle = this.getAngleNumber(
        (this.currentAngle += this.rotation)
      );
      this.emitChange(this.currentAngle);
      this.active = false;
    },
    /**
     * Emit change event to parent component
     * @param {Number} angle - the current angle to emit via event payload
     */
    emitChange(angle) {
      this.$emit('change', Math.round(angle));
    }
  }
};
