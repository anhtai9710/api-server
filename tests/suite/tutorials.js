const { describe, it, before } = require('mocha');
const { expect } = require('chai');
const request = require('../base');

describe('/libraries/:library/tutorials', () => {
    describe('Requesting for a valid library (:library = backbone.js)', () => {
        describe('No query params', () => {
            const test = () => request().get('/libraries/backbone.js/tutorials');
            let response;
            before('fetch endpoint', done => {
                test().end((err, res) => {
                    response = res;
                    done();
                });
            });
            it('returns the correct CORS and Cache headers', done => {
                expect(response).to.have.header('Access-Control-Allow-Origin', '*');
                expect(response).to.have.header('Cache-Control', 'public, max-age=86400'); // 24 hours
                done();
            });
            it('returns a JSON body that is an array of tutorial objects', done => {
                expect(response).to.be.json;
                expect(response.body).to.be.an('array');
                for (const result of response.body) {
                    expect(result).to.be.an('object');
                }
                done();
            });
            describe('Tutorial object', () => {
                it('is an object with \'id\', \'name\' and \'content\' properties', done => {
                    // and any properties from the tutorial metadata
                    for (const result of response.body) {
                        expect(result).to.have.property('id').that.is.a('string');
                        expect(result).to.have.property('name').that.is.a('string');
                        expect(result).to.have.property('content').that.is.a('string');
                    }
                    done();
                });
            });
        });

        describe('Requesting a field (?fields=name)', () => {
            const test = () => request().get('/libraries/backbone.js/tutorials?fields=name');
            let response;
            before('fetch endpoint', done => {
                test().end((err, res) => {
                    response = res;
                    done();
                });
            });
            it('returns the correct CORS and Cache headers', done => {
                expect(response).to.have.header('Access-Control-Allow-Origin', '*');
                expect(response).to.have.header('Cache-Control', 'public, max-age=86400'); // 24 hours
                done();
            });
            it('returns a JSON body that is an array of tutorial objects', done => {
                expect(response).to.be.json;
                expect(response.body).to.be.an('array');
                for (const result of response.body) {
                    expect(result).to.be.an('object');
                }
                done();
            });
            describe('Tutorial object', () => {
                it('is an object with \'id\' and \'name\' properties', done => {
                    for (const result of response.body) {
                        expect(result).to.have.property('id').that.is.a('string');
                        expect(result).to.have.property('name').that.is.a('string');
                    }
                    done();
                });
                it('has no other properties', done => {
                    for (const result of response.body) {
                        expect(Object.keys(result)).to.have.lengthOf(2);
                    }
                    done();
                });
            });
        });

        describe('Requesting all fields (?fields=*)', () => {
            const test = () => request().get('/libraries/backbone.js/tutorials?fields=*');
            let response;
            before('fetch endpoint', done => {
                test().end((err, res) => {
                    response = res;
                    done();
                });
            });
            it('returns the correct CORS and Cache headers', done => {
                expect(response).to.have.header('Access-Control-Allow-Origin', '*');
                expect(response).to.have.header('Cache-Control', 'public, max-age=86400'); // 24 hours
                done();
            });
            it('returns a JSON body that is an array of tutorial objects', done => {
                expect(response).to.be.json;
                expect(response.body).to.be.an('array');
                for (const result of response.body) {
                    expect(result).to.be.an('object');
                }
                done();
            });
            describe('Tutorial object', () => {
                // Behaves the same as not including the fields query param
                it('is an object with \'id\', \'name\' and \'content\' properties', done => {
                    // and any properties from the tutorial metadata
                    for (const result of response.body) {
                        expect(result).to.have.property('id').that.is.a('string');
                        expect(result).to.have.property('name').that.is.a('string');
                        expect(result).to.have.property('content').that.is.a('string');
                    }
                    done();
                });
            });
        });
    });

    describe('Requesting for a non-existent library (:library = this-library-doesnt-exist)', () => {
        describe('No query params', () => {
            const test = () => request().get('/libraries/this-library-doesnt-exist/tutorials');
            let response;
            before('fetch endpoint', done => {
                test().end((err, res) => {
                    response = res;
                    done();
                });
            });
            it('returns the correct CORS and Cache headers', done => {
                expect(response).to.have.header('Access-Control-Allow-Origin', '*');
                expect(response).to.have.header('Cache-Control', 'public, max-age=3600'); // 1 hour
                done();
            });
            it('returns a JSON body that is a valid error response', done => {
                expect(response).to.be.json;
                expect(response.body).to.be.an('object');
                expect(response.body).to.have.property('error', true);
                expect(response.body).to.have.property('status', 404);
                expect(response.body).to.have.property('message', 'Library not found');
                done();
            });
        });
    });
});

describe('/libraries/:library/tutorials/:tutorial', () => {
    describe('Requesting for a valid library (:library = backbone.js)', () => {
        describe('Requesting a valid tutorial (:tutorial = what-is-a-view)', () => {
            describe('No query params', () => {
                const test = () => request().get('/libraries/backbone.js/tutorials/what-is-a-view');
                let response;
                before('fetch endpoint', done => {
                    test().end((err, res) => {
                        response = res;
                        done();
                    });
                });
                it('returns the correct CORS and Cache headers', done => {
                    expect(response).to.have.header('Access-Control-Allow-Origin', '*');
                    expect(response).to.have.header('Cache-Control', 'public, max-age=1209600'); // 2 weeks
                    done();
                });
                it('returns a JSON body that is a tutorial object', done => {
                    expect(response).to.be.json;
                    expect(response.body).to.be.an('object');
                    done();
                });
                describe('Tutorial object', () => {
                    it('is an object with \'id\', \'name\' and \'content\' properties', done => {
                        // and any properties from the tutorial metadata
                        expect(response.body).to.have.property('id').that.is.a('string');
                        expect(response.body).to.have.property('name').that.is.a('string');
                        expect(response.body).to.have.property('content').that.is.a('string');
                        done();
                    });
                });
            });

            describe('Requesting a field (?fields=name)', () => {
                const test = () => request().get('/libraries/backbone.js/tutorials/what-is-a-view?fields=name');
                let response;
                before('fetch endpoint', done => {
                    test().end((err, res) => {
                        response = res;
                        done();
                    });
                });
                it('returns the correct CORS and Cache headers', done => {
                    expect(response).to.have.header('Access-Control-Allow-Origin', '*');
                    expect(response).to.have.header('Cache-Control', 'public, max-age=1209600'); // 2 weeks
                    done();
                });
                it('returns a JSON body that is a tutorial objects', done => {
                    expect(response).to.be.json;
                    expect(response.body).to.be.an('object');
                    done();
                });
                describe('Tutorial object', () => {
                    it('is an object with only the \'name\' property', done => {
                        expect(response.body).to.have.property('name').that.is.a('string');
                        done();
                    });
                    it('has no other properties', done => {
                        expect(Object.keys(response.body)).to.have.lengthOf(1);
                        done();
                    });
                });
            });

            describe('Requesting all fields (?fields=*)', () => {
                const test = () => request().get('/libraries/backbone.js/tutorials/what-is-a-view?fields=*');
                let response;
                before('fetch endpoint', done => {
                    test().end((err, res) => {
                        response = res;
                        done();
                    });
                });
                it('returns the correct CORS and Cache headers', done => {
                    expect(response).to.have.header('Access-Control-Allow-Origin', '*');
                    expect(response).to.have.header('Cache-Control', 'public, max-age=1209600'); // 2 weeks
                    done();
                });
                it('returns a JSON body that is a tutorial objects', done => {
                    expect(response).to.be.json;
                    expect(response.body).to.be.an('object');
                    done();
                });
                describe('Tutorial object', () => {
                    // Behaves the same as not including the fields query param
                    it('is an object with \'id\', \'name\' and \'content\' properties', done => {
                        // and any properties from the tutorial metadata
                        expect(response.body).to.have.property('id').that.is.a('string');
                        expect(response.body).to.have.property('name').that.is.a('string');
                        expect(response.body).to.have.property('content').that.is.a('string');
                        done();
                    });
                });
            });
        });

        describe('Requesting a non-existent tutorial (:tutorial = this-tutorial-doesnt-exist)', () => {
            describe('No query params', () => {
                const test = () => request().get('/libraries/backbone.js/tutorials/this-tutorial-doesnt-exist');
                let response;
                before('fetch endpoint', done => {
                    test().end((err, res) => {
                        response = res;
                        done();
                    });
                });
                it('returns the correct CORS and Cache headers', done => {
                    expect(response).to.have.header('Access-Control-Allow-Origin', '*');
                    expect(response).to.have.header('Cache-Control', 'public, max-age=3600'); // 1 hour
                    done();
                });
                it('returns a JSON body that is a valid error response', done => {
                    expect(response).to.be.json;
                    expect(response.body).to.be.an('object');
                    expect(response.body).to.have.property('error', true);
                    expect(response.body).to.have.property('status', 404);
                    expect(response.body).to.have.property('message', 'Tutorial not found');
                    done();
                });
            });
        });
    });

    describe('Requesting for a non-existent library (:library = this-library-doesnt-exist)', () => {
        describe('Requesting a non-existent tutorial (:tutorial = this-tutorial-doesnt-exist)', () => {
            describe('No query params', () => {
                const test = () => request().get('/libraries/this-library-doesnt-exist/tutorials/this-tutorial-doesnt-exist');
                let response;
                before('fetch endpoint', done => {
                    test().end((err, res) => {
                        response = res;
                        done();
                    });
                });
                it('returns the correct CORS and Cache headers', done => {
                    expect(response).to.have.header('Access-Control-Allow-Origin', '*');
                    expect(response).to.have.header('Cache-Control', 'public, max-age=3600'); // 1 hour
                    done();
                });
                it('returns a JSON body that is a valid error response', done => {
                    expect(response).to.be.json;
                    expect(response.body).to.be.an('object');
                    expect(response.body).to.have.property('error', true);
                    expect(response.body).to.have.property('status', 404);
                    expect(response.body).to.have.property('message', 'Library not found');
                    done();
                });
            });
        });
    });
});