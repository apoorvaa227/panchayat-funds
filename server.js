const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
let fundData = {
    totalFunds: 500000,
    allocatedFunds: {
      roadConstruction: 100000,
      streetLights: 50000,
      drainage: 70000,
    },
  };


  const calculateRemainingFunds = () => {
    return (
        fundData.totalFunds -
        Object.values(fundData.allocatedFunds).reduce((a, b) => a + b, 0)
    );
};

app.post('/allocate', (req, res) => {
 const { category , amount } = req.body;
   if( !fundData.allocatedFunds[category])
   {
    return res.status(400).json({ error: "Category fucking does not exist" });
   }
   const remainingFunds = calculateRemainingFunds();
   if( remainingFunds >= amount)
   {
    fundData.allocatedFunds[category] += amount;
     res.json({ message : ` alloacted ${amount} to ${category}`, fundData });
   }
   else 
   {
    res.status(400).json({ error : "insuffient Funds" });
   }
});


app.get("/funds", (req, res) => {
    const remainingFunds = calculateRemainingFunds();
    res.json({
      totalFunds: fundData.totalFunds,
      allocatedFunds: fundData.allocatedFunds,
      remainingFunds: remainingFunds,
    });
  });

app.post( '/revert' , ( req , res) =>
{
 
const { category , amount} = req.body;
if( ! fundData.allocatedFunds[category] )
{
  return res.status( 400).json({ error : "category does not exist"});
}
if( fundData.allocatedFunds[category] >= amount)
{
    fundData.allocatedFunds[category] -= amount;
    res.json({ message: `Reverted ${amount} from ${category}.`, fundData });
}
else 
{
    res.status(400).json({ message: "Invalid revert amount!" });
}
});


const PORT = 8000;
app.listen( PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    });