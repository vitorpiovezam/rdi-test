const AWS = require("aws-sdk");
const express = require("express");
const serverless = require("serverless-http");

const app = express();

const PRODUCT_TABLE = process.env.PRODUCT_TABLE;
const PRODUCT_STATUS_TABLE = process.env.PRODUCT_STATUS_TABLE;
const PRODUCT_COMPONENTS_TABLE = process.env.PRODUCT_COMPONENTS_TABLE;

const dynamoDbClient = new AWS.DynamoDB.DocumentClient({
  region: process.env.REGION,
  endpoint: process.env.AWS_DYNAMODB_URL,
  accessKeyId: 'DEFAULT_ACCESS_KEY',
  secretAccessKey: 'DEFAULT_SECRET'
});

app.use(express.json());

// Products

app.get("/product", async function (req, res) {
  const params = {
    TableName: PRODUCT_TABLE,
  };

  try {
    const { Items } = await dynamoDbClient.scan(params).promise();
    if (Items) {
      res.json({ Items });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find item with provided "uid"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive item" });
  }
});

app.get("/product/:uid", async function (req, res) {
  const params = {
    TableName: PRODUCT_TABLE,
    Key: {
      uid: req.params.uid,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const { uid, name } = Item;
      res.json({ uid, name });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find item with provided "uid"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive item" });
  }
});

app.post("/product", async function (req, res) {
  const { uid, name, type, imgUrl, price } = req.body.body;
  if (typeof uid !== "string") {
    res.status(400).json({ error: '"uid" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const Item = {
    uid: uid,
    name: name,
    type: type,
    imgUrl: imgUrl,
    price: price
  };

  const params = {
    TableName: PRODUCT_TABLE,
    Item
  };

  try {
    await dynamoDbClient.put(params).promise();
    res.json(Item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create item" });
  }
});

app.put("/product", async function (req, res) {
  const { uid, name, type, imgUrl, price } = req.body.body.product;
  if (typeof uid !== "string") {
    res.status(400).json({ error: '"uid" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }
  
  const Item = {
    uid: uid,
    name: name,
    type: type,
    imgUrl: imgUrl,
    price: price
  };

  const params = {
    TableName: PRODUCT_TABLE,
    Item
  };

  try {
    await dynamoDbClient.put(params).promise();
    res.json(Item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create item" });
  }
});


// Products Status

app.get("/productStatus", async function (req, res) {
  const params = {
    TableName: PRODUCT_STATUS_TABLE,
  };

  try {
    const { Items } = await dynamoDbClient.scan(params).promise();
    if (Items) {
      res.json({ Items });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find item with provided "uid"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive item" });
  }
});

app.get("/productStatus/:uid", async function (req, res) {
  const params = {
    TableName: PRODUCT_STATUS_TABLE,
    Key: {
      uid: req.params.uid,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const { uid, name } = Item;
      res.json({ uid, name });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find item with provided "uid"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive item" });
  }
});

app.post("/productStatus", async function (req, res) {
  const { uid, name } = req.body;
  if (typeof uid !== "string") {
    res.status(400).json({ error: '"uid" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: PRODUCT_STATUS_TABLE,
    Item: {
      uid: uid,
      name: name,
    },
  };

  try {
    await dynamoDbClient.put(params).promise();
    res.json({ uid, name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create item" });
  }
});

// Products Components

app.get("/productComponents", async function (req, res) {
  const params = {
    TableName: PRODUCT_COMPONENTS_TABLE,
  };

  try {
    const { Items } = await dynamoDbClient.scan(params).promise();
    if (Items) {
      res.json({ Items });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find item with provided "uid"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive item" });
  }
});

app.get("/productComponents/:uid", async function (req, res) {
  const params = {
    TableName: PRODUCT_COMPONENTS_TABLE,
    Key: {
      uid: req.params.uid,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      const { uid, name } = Item;
      res.json({ uid, name });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find item with provided "uid"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retreive item" });
  }
});

app.post("/productComponents", async function (req, res) {
  const { uid, name } = req.body;
  if (typeof uid !== "string") {
    res.status(400).json({ error: '"uid" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: PRODUCT_COMPONENTS_TABLE,
    Item: {
      uid: uid,
      name: name,
    },
  };

  try {
    await dynamoDbClient.put(params).promise();
    res.json({ uid, name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create item" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


module.exports.handler = serverless(app);
