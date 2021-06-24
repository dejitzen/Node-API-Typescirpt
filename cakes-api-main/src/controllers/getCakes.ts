import {CustomResponse} from "../../models/cake"
export async function getCakes (pool:any , req:Request, res:CustomResponse) {
    let cakes
    var queryString = `SELECT * FROM cakes`
  try {
    cakes = await pool.query(queryString)
    console.log(queryString)
    return res.json({success:true,data:cakes.rows})
  } catch (e) {
    console.log("error=", e);
    return res.status(500).json({success:false,data:e})
  }}