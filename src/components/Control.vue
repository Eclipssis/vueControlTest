<template>
  <div
    class="control"
    :class="{ 'control--open': active }"
    v-click-outside="onHideControl"
    @click="onControlFocused(true)"
  >
    <label v-if="label" :for="`control-${this._uid}`" class="control__label">
      {{ label }}
    </label>

    <div class="control__body">
      <input
        type="text"
        :id="`control-${this._uid}`"
        class="control__input"
        v-model="internalValue"
        @keyup.enter="onControlFocused(false)"
        @keyup.esc="onEscapeControl"
        @focus="onControlFocused(true)"
        @input="filterInput"
        @keydown.tab="onControlFocused(false)"
      />

      <span v-if="!active" class="control__arrow" @click="onArrowClick"
        >&#10094;
      </span>

      <div
        v-if="active"
        class="control__plus"
        @click="onIncrementControl"
      ></div>
      <div
        v-if="active"
        class="control__minus"
        @click="onDecrementControl"
      ></div>
    </div>

    <div v-if="active && helper" class="control__helper" @click="onClickHepler">
      {{ helper.name }}
    </div>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";

export default {
  name: "Control",

  directives: {
    ClickOutside
  },

  props: {
    value: {
      type: Number,
      default: 0
    },

    helper: {
      type: Object,
      default: () => {}
    },

    label: {
      type: String,
      default: ""
    }
  },

  data() {
    return {
      saveValue: true,
      active: false,
      tempValue: null,
      initialValue: this.value
    };
  },

  computed: {
    internalValue: {
      get() {
        if (
          typeof +this.initialValue !== "number" ||
          isNaN(+this.initialValue)
        ) {
          return 0;
        }

        return this.formatInputValue(this.initialValue);
      },

      set(value) {
        this.initialValue = value;
      }
    }
  },

  watch: {
    value(newValue, oldValue) {
      this.initialValue = newValue;

      if (this.active && this.saveValue) {
        this.saveValue = false;
        this.tempValue = oldValue;
      }
    }
  },

  methods: {
    onHideControl() {
      this.onControlFocused(false);
    },

    formatInputValue(value) {
      const numberRegExp = /(\d)(?=(\d\d\d)+([^\d]|$))/g;
      if (this.active) {
        return value;
      } else {
        return String(value).replace(numberRegExp, "$1 ");
      }
    },

    filterInput(e) {
      const value = e.target.value.replace(/[^0-9]+/g, "");

      e.target.value = value;
      this.$emit("input", +e.target.value);
    },

    onClickHepler() {
      this.helper.fn();
    },

    onEscapeControl() {
      this.initialValue = this.tempValue;
      this.onControlFocused(false);
    },

    onArrowClick() {
      this.onControlFocused(true);
      document.getElementById(`control-${this._uid}`).focus();
    },

    onControlFocused(value) {
      if (!value) {
        this.active = value;
        document.getElementById(`control-${this._uid}`).blur();
        this.saveValue = true;
        this.tempValue = null;
      } else {
        this.active = value;
      }
    },

    onIncrementControl() {
      this.$emit("input", (this.initialValue += 1));
      this.active = true;
    },

    onDecrementControl() {
      if (this.initialValue > 0) {
        this.$emit("input", (this.initialValue -= 1));
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.control {
  max-width: 200px;
  margin: 0 auto 15px;
  text-align: left;

  &--open {
    .control__input {
      border: 1px solid #000;
      color: #000 !important;
      background: #eeeeee;
      cursor: default;
    }

    .control__body .control__arrow {
      color: #000 !important;
    }
  }

  &__body {
    position: relative;

    &:hover .control__arrow,
    &:hover .control__input {
      color: red;
      transition: all 0.3s ease;
    }
  }

  &__label {
    font-size: 13px;
    font-style: italic;
  }

  &__input {
    width: 100%;
    padding: 5px 10px;
    border: none;
    outline: none;
    border-radius: 2px;
    border: 1px solid transparent;
    cursor: pointer;
  }

  &__helper {
    color: #0059ff;
    font-size: 13px;
    cursor: pointer;
    margin-top: 2px;
  }

  &__arrow {
    position: absolute;
    top: 50%;
    right: 10px;
    margin-top: -10px;
    transform: rotate(-90deg);
    cursor: pointer;
  }

  &__plus {
    position: absolute;
    top: 7px;
    right: 10px;
    cursor: pointer;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 4px 4px 4px;
    border-color: transparent transparent #000000 transparent;
  }

  &__minus {
    position: absolute;
    top: 16px;
    right: 10px;
    cursor: pointer;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 4px 0 4px;
    border-color: #000000 transparent transparent transparent;
  }
}
</style>
