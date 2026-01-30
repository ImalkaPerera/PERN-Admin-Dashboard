import express from "express";

const app=express();

const port=3000;


const router=express.Router();

app.use(express.json());

app.use((req,res,next)=>{
    const timeStamp=new Date().toISOString();
    console.log(`[${timeStamp}] ${req.method} ${req.originalUrl}`);
    next();
})

let cars=[
    {id:1,make:"Toyota",model:"Camry",year:2020,price:24000},
    {id:2,make:"Honda",model:"Accord",year:2019,price:22000},
    {id:3,make:"Ford",model:"Mustang",year:2021,price:26000}
]
app.get("/",(req,res)=>{
    res.json(cars);
});

router.get("/",(req,res)=>{
    res.json(cars);
});

router.post("/",(req,res)=>{
    const {make,model,year,price}=req.body;
    if(!make||!model||!year||!price){
        return res.status(400).send("All field are required");
    }
    const newCar={
        id:cars.length+1,
        make,
        model,
        year,
        price
    }
    cars.push(newCar);
    res.status(201).send("Car added");
});

router.put("/cars/:id",(req,res)=>{
    const id=req.params.id;
    const index=cars.findIndex(c=>c.id===parseInt(id));
    if(index===-1) return res.status(404).send("Car not found");
    const{make,model,year,price}=req.body;
    if(make) cars[index].make=make;
    if(model) cars[index].model=model;
    if(year) cars[index].year=year;
    if(price) cars[index].price=price;
    res.send("Car updated");

});

router.delete("/cars/:id",(req,res)=>{
    const id =req.params.id;
    cars=cars.filter(c=>c.id!==parseInt(id));
    res.send("Car deleted");
});

router.get("/:id",(req,res)=>{
    const id=req.params.id;
    const car=cars.find(c=>c.id===parseInt(id));
    if(!car) return res.status(404).send("Car not found");
    res.json(car);
});


app.use("/api/v1/cars",router);


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})