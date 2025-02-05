import { decodeShopOpaqueId, decodeTagOpaqueId } from "../../xforms/id.js";

/**
 * @name Query.productsByTagId
 * @method
 * @memberof Tags/GraphQL
 * @summary get a list of products by tag id
 * @param {Object} _ - unused
 * @param {Object} [params] - an object of all arguments that were sent by the client
 * @param {String} [params.shopId] - Shop id
 * @param {String} [params.tagId] - Tag id
 * @param {String} [params.query] - Query string
 * @param {Object} context - an object containing the per-request state
 * @returns {Promise<Array<Object>>} TagProducts Connection
 */
export default async function productsByTagId(_, params, context) {
  const {
    after,
    before,
    first,
    last,
    shopId: opaqueShopId,
    sortOrder,
    tagId: opaqueTagId,
    query
  } = params;

  const shopId = decodeShopOpaqueId(opaqueShopId);
  const tagId = decodeTagOpaqueId(opaqueTagId);

    const result =context.queries.productsByTagId(context, {
    connectionArgs: {
      after,
      before,
      first,
      last,
      sortOrder
    },
    shopId,
    tagId,
    query
  });
  console.log("result", result);
  return result;
}
