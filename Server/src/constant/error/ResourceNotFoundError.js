/*
Ex:
- When client is not found by its own ID
  throw new ResourceNotFoundError('client', '1');
  message: client with ID 1 is not found
- When client is not found by foreign / reference ID
  throw new ResourceNotFoundError('client', '1', 'user');
  message: client with user ID 1 is not found
*/
export default class ResourceNotFoundError extends Error {
  constructor(resourceModel, id, referenceModel) {
    const resourceModelName = resourceModel ? resourceModel.modelName : 'Resource';
    const referenceModelName = referenceModel ? `${referenceModel.modelName} ` : '';
    const withId = id ? `with ${referenceModelName}ID ${id} ` : '';
    super(`${resourceModelName} ${withId}is not found`);
    this.name = 'ResourceNotFoundError';
    this.statusCode = 400;
  }
}
