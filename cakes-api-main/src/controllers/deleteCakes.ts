import {DeleteType} from "../../models/cake"
import {CustomResponse} from "../../models/cake"

export async function deleteCakes (pool:any , req:Request, res:CustomResponse) {
    const data: DeleteType|null = req.body
    if (!data?.id) {
      return res.status(400).json({success:false,data:"Id must be provided"})
    }
    let cakes
    var queryString = `DELETE FROM cakes
    WHERE id= '${data?.id}'`
  try {
    cakes = await pool.query(queryString)
    console.log(queryString)
    return res.json({success:true})
  } catch (e) {
    console.log("error=", e);
    return res.status(500).json({success:false,data:e})
  }}