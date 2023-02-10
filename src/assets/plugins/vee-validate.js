import { Field, Form } from 'vee-validate';

export default {
  components: {
    Field,
    Form,
  },
  methods: {
    isRequired(value) {
      return value ? true : 'This field is required';
    },
  },
};