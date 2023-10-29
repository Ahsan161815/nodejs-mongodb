const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
class Product {
  constructor(title, price, description, imageUrl, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    return db
      .collection('products')
      .insertOne(this)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection('products').findOne({ _id: new mongodb.ObjectId(prodId) }).then(
      product => {
        console.log(product);
        return product;
      }
    ).catch(err => {
      console.log(err);
    });
  }

  static update(prodId, product) {
    const db = getDb();
    return db
      .collection('products')
      .updateOne({ _id: new mongodb.ObjectId(prodId) }, { $set: product })
      .then(result => {
        console.log(result);
        return result;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static delete(prodId){
    const db = getDb();
    return db.collection('products').deleteOne({_id: new mongodb.ObjectId(prodId)}).then(result => {
      console.log(result);
      return result
    }).catch(err => {
      console.log(err);
    })
  }
}

module.exports = Product;