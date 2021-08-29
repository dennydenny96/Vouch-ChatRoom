// Plugin must be called before mongoose.model called
// This plugin is used to turn on mongoose validation on update process (which is off by default)
// reference: https://mongoosejs.com/docs/plugins.html
export default function loadValidationPlugin(newSchema) {
  function setRunValidators() {
    this.setOptions({ runValidators: true });
  }
  newSchema.plugin((schema) => {
    schema.pre('findOneAndUpdate', setRunValidators);
    schema.pre('updateMany', setRunValidators);
    schema.pre('updateOne', setRunValidators);
    schema.pre('update', setRunValidators);
  });
}
