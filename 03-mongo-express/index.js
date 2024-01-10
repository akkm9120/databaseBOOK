const express = require('express');
require("dotenv").config();
const  {MongoClient} = require("mongodb");

const app = express();
app.set("view engine" , "hbs");

async function main(){
    const client = await MongoClient.connect(process.env.MONGO_URL);
    const db = client.db("sample_airbnb");

    app.get("/listing", async function(req,res){
        const listings = await db.collection("listingAndReviews")
                            .find()
                            .limit()
                            .toArray();
                            res.send(listings);
        res.render("listings.hbs",{
            "allListings": listings
        }); 
    })
}

main();

app.listen(3000,function(){
    console.log("server has started");
})