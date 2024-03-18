import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/Food_Ordering_App")
  .then(() => {
    console.log("DB is connected ");
  })
  .catch(e => console.log(e.message));

export default mongoose;
