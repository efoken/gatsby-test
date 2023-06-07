import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import getProducts from '../../../server/get-products'

export default function handler(
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) {
  getProducts(req, res)
}
