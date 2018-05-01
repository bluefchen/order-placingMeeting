<script>
  export default {
    functional: true,
    props: {
      index: Number,
      row: Object,
      render: Function
    },
    render: (h, ctx) => {
      const params = {
        row: ctx.props.row,
        index: ctx.props.index
      };
      return ctx.props.render(h, params);
    }
  };
</script>
