var request = require('supertest')
    , app = require('../app.js');

describe("Push a paste", function () {
    var newURL;
    it("responded with a redirect 302", function (done) {
        request(app)
            .post("/submit")
            .send({data: "I am the `input`", style: "ir-black"})
            .expect(302)
            .expect("Location", /p/)
            .end(function(err, res){
                if(err) return done(err)
                newURL = res.headers["location"]
                done()
            })
    })

    it("can get just created snip", function(done){
        request(app)
            .get(newURL)
            .expect(200)
            .expect(/I am the `input`/, done)
    })
});


