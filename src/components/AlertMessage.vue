<template>
  <div class="message-alert">
    <div class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'alertMessage',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('alertModules', ['messages']),
  },
  methods: {
    updateMessage(message, status) {
      this.$store.dispatch('alertModules/updateMessage', { message, status });
    },
    ...mapActions('alertModules', ['removeMessage', 'removeMessageWithTiming']),
  },
  created() {
    const vm = this;
    vm.$bus.$on('messsage:push', (message, status = 'warning') => {
      vm.updateMessage(message, status);
    });
  },
};
</script>

<style scope>
  .message-alert {
    position: fixed;
    max-width: 50%;
    top: 56px;
    right: 20px;
    z-index: 1100;
  }
</style>
