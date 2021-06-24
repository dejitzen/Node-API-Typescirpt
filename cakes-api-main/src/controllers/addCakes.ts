import {CakesType} from "../../models/cake"
import {CustomResponse} from "../../models/cake"

export async function addCakes (pool:any , req:Request, res:CustomResponse) {
    const data: CakesType|null = req.body
    if (!data?.name|| !data?.comment|| !data?.imageurl || !data?.yumfactor) {
      return res.status(400).json({success:false,data:"All 4 fields must be provided"})
    }
    else if (data?.name.length>30) {
      return res.status(400).json({success:false,data:"Name length bigger than 30"})
    }
    else if (data?.comment.length>200) {
      return res.status(400).json({success:false,data:"Comment length bigger than 200"})
    }
    else if (data?.yumfactor>5 || data?.yumfactor<1) {
      return res.status(400).json({success:false,data:"yumfactor must be between 1 and 5"})
    } 
    else{
      let comment = data?.comment.replace(/'/g, "''")
      let name = data?.name.replace(/'/g, "''")

    var queryString = `INSERT INTO cakes(name,comment,imageurl,yumfactor) Values ( '${name}','${comment}','${data?.imageurl}',${data?.yumfactor})`
    let cakes
  try {
    cakes = await pool.query(queryString)
    console.log(queryString)
    return res.json({success:true})
  } catch (e) {
    console.log("error=", e);
    return res.status(500).json({success:false,data:e})
  }}}