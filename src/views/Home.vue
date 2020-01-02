<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />

    <h1>Controls</h1>

    <Control v-model="control1" :label="'Control 1'" :helper="summHelper" />
    <Control v-model="control2" :label="'Control 2'" :helper="millonHelper" />
    <Control v-model="control3" :label="'Control 3'" />
  </div>
</template>

<script>
// import components
import Control from "@/components/Control.vue";
import { mapMutations } from "vuex";

// import helpers
// import { setConstForControl } from "@/helpers/controlHelper";

export default {
  name: "home",

  components: {
    Control
  },

  data() {
    return {
      millonHelper: {
        name: "Миллион",
        fn: () => {
          // setConstForControl.call(null, context, 1000000, this);
          this.setControlState({ target: "control2", value: 1000000 });
        }
      },

      summHelper: {
        name: "Сумма",
        fn: () => {
          // this.control1 = this.control2 + this.control3;
          this.setControlState({
            target: "control1",
            value: this.control2 + this.control3
          });
        }
      }
    };
  },

  computed: {
    control1: {
      get() {
        return this.$store.state.control1;
      },

      set(value) {
        this.setControlState({ target: "control1", value: value });
      }
    },

    control2: {
      get() {
        return this.$store.state.control2;
      },

      set(value) {
        this.setControlState({ target: "control2", value: value });
      }
    },

    control3: {
      get() {
        return this.$store.state.control3;
      },

      set(value) {
        this.setControlState({ target: "control3", value: value });
      }
    }
  },

  watch: {
    control2(newValue) {
      this.setControlState({ target: "control3", value: newValue });
    },

    control3(newValue) {
      // this.control2 = newValue;
      this.setControlState({ target: "control2", value: newValue });
    }
  },

  methods: {
    ...mapMutations({
      setControlState: "setControlState"
    })
  }
};
</script>
<style scoped>
.home {
  min-height: 100vh;
}
</style>
