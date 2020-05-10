export const formFieldMixin = {
  inheritAttrs: false,
  props: {
    label: {
      type: String
    },
    value: {
      type: [String, Number]
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event.target.value)
    }
  }
}
