
const express = require('express') 
const path = require('path')
const PORT = process.env.PORT || 5000 
var app = express();

const { Pool } = require('pg');
var pool;
pool = new Pool({
  connectionString: process.env.DATABASE_URL
  ssl: true
})


app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('pages/tokimon'));
app.get('/about', (req, res) => res.render('pages/about'));
app.get('/addTokimon', (req, res) => res.render('pages/addtokimon'));

app.post('/displaytokimon', (req, res) => {
  var tokimonName=req.body.tokimonName;
  var trainerName=req.body.trainerName;
  if (!tokimonName || !trainerName)
    res.render('pages/addtokimon');
  else{
    var getTokimonNamesQuery=`SELECT * FROM tokimon WHERE name = '${tokimonName}'`;
    pool.query(getTokimonNamesQuery, (error, result) => {
      if (error)
        res.end(error);

      var tokimonWeight=parseInt(req.body.tokimonWeight);
      var tokimonHeight=parseInt(req.body.tokimonHeight);
      var tokimonFly=parseInt(req.body.tokimonFly);
      var tokimonFight=parseInt(req.body.tokimonFight);
      var tokimonFire=parseInt(req.body.tokimonFire);
      var tokimonFreeze=parseInt(req.body.tokimonFreeze);
      var tokimonElectric=parseInt(req.body.tokimonElectric);
      var tokimonWater=parseInt(req.body.tokimonWater);

      var tokimonTotal=tokimonFly+tokimonFight+tokimonFire+tokimonFreeze+tokimonElectric+tokimonWater;

      var tokimons={'rows': result.rows};

      if (!Array.isArray(tokimons['rows']) || !tokimons['rows'].length){ // add new tokimon to db        

        var insertTokimonQuery=`INSERT INTO tokimon (name, weight, height, fly, fight, fire, 
        water, electric, ice, total, trainername)
        VALUES ('${tokimonName}', ${tokimonWeight}, 
        ${tokimonHeight}, ${tokimonFly}, ${tokimonFight},
        ${tokimonFire}, ${tokimonWater}, ${tokimonElectric}, 
        ${tokimonFreeze}, ${tokimonTotal}, '${trainerName}')`;

        pool.query(insertTokimonQuery, (newerror, newresult) => {
          if (newerror)
            res.end(newerror);
        });
      }
      else{ // change an existing Tokimon        
        var changeTokimonQuery=`UPDATE tokimon
                                SET weight=${tokimonWeight}, height=${tokimonHeight}, 
                                fly=${tokimonFly}, fight=${tokimonFight}, fire=${tokimonFire},
                                water=${tokimonWater}, electric=${tokimonElectric},
                                ice=${tokimonFreeze}, total=${tokimonTotal}, trainername='${trainerName}'
                                WHERE name='${tokimonName}'`;

        pool.query(changeTokimonQuery, (error, result) => {
          if (error)
            res.end(error);
        });
      }
      var getTokimonsQuery=`SELECT * FROM tokimon`;

      pool.query(getTokimonsQuery, (error, result) =>{
        if (error)
          res.end(error);

        var allTokimons = {'rows': result.rows};
        res.render('pages/displayTokimon', allTokimons);
      });

    });
  } 

}); // add new/change existing Tokimons in db

app.get('/viewTokimon', (req,res) => {
  var getTokimonsQuery=`SELECT * FROM tokimon`;

  pool.query(getTokimonsQuery, (error, result) =>{
    if (error)
      res.end(error);

    var allTokimons = {'rows': result.rows};
    res.render('pages/displayTokimon', allTokimons);
  });
}); // display all Tokimons in db


app.get('/removeTokimon/:tokimonID', (req,res) => {

  var deleteTokimonQuery=`DELETE FROM tokimon
                          WHERE tid = ${req.params.tokimonID}`;

  pool.query(deleteTokimonQuery, (error, result) =>{
    if (error)
      res.end(error);

    var getTokimonsQuery=`SELECT * FROM tokimon`;

    pool.query(getTokimonsQuery, (error, result) =>{
      if (error)
        res.end(error);

      var allTokimons = {'rows': result.rows};
      res.render('pages/displayTokimon', allTokimons);
    });
  });
}); // Remove a particular Tokimon from db

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
