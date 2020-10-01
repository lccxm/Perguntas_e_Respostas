const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const questionModel = require("./database/Question");


//database
connection
    .authenticate()
    .then(()=>{
        console.log("deu bom");
    })
    .catch((err)=>{
        console.log(err);
    })

app.set('view engine','ejs'); //setando a view engine pro ejs
app.use(express.static('public'));  //programa aceita arquivos estaticos no diretorio public

app.use(bodyParser.urlencoded({extended: false})); //permite a traducao de dados em estrutura javascript
app.use(bodyParser.json()); //permite leitura de dados json

app.get("/",(req,res)=>{
    questionModel.findAll({raw: true, order:[
        ['id', 'DESC']   //mostra as perguntas por id decrescente (da mais recente a mais antiga)
    ]}).then(questions => {
        res.render("index",{
            questions: questions
        });
    })
});

app.get("/perguntar",(req,res)=>{
    res.render("perguntar");
});

app.post("/savequestion",(req,res)=>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    questionModel.create({
        title: titulo,
        description: descricao
    }).then(()=>{
        res.redirect("/");
    })

})

app.get("/pergunta/:id",(req,res)=>{
    var id = req.params.id;
    questionModel.findOne({
        where: {id: id}
    }).then(question => {
        if(question != undefined){
            res.render("pergunta",{
                question: question
            })
        }else{
            res.redirect("/")
        }
    })
})

app.listen(8080,()=>{
    console.log("rodando");
});