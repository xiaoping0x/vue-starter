export default function(Vapi) {
  // this.$store.dispatch('actionName', {params: {}, data: {}})
  Vapi.prototype.rest = function rest(entity) {
    const entityPlural = entity + 's';
    const upperCase = entity[0].toUpperCase() + entity.substr(1);
    const upperCasePlural = entityPlural[0].toUpperCase() + entityPlural.substr(1);

    const listAction = `get${upperCasePlural}`;
    const getAction = `get${upperCase}`;
    const createAction = `create${upperCase}`;
    const updateAction = `update${upperCase}`;
    const deleteAction = `delete${upperCase}`;

    return this.get({
      action: listAction,
      property: `${entityPlural}`,
      path: `/${entityPlural}`,
    })
      .get({
        action: getAction,
        property: entity,
        path: ({ id }) => `/${entityPlural}/${id}`,
      })
      .post({
        action: createAction,
        property: entity,
        path: `/${entityPlural}`,
      })
      .put({
        action: updateAction,
        property: entity,
        path: ({ id }) => `/${entityPlural}/${id}`,
      })
      .delete({
        action: deleteAction,
        path: ({ id }) => `/${entityPlural}/${id}`,
      });
  };
}
