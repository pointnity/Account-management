'use strict'

var test = require('tape')
var index = require('./index')

var PrivateKeychain = index.PrivateKeychain,
    PublicKeychain = index.PublicKeychain

var HDPrivateKey = index.HDPrivateKey,
    HDPublicKey = index.HDPublicKey,
    PrivateKey = index.PrivateKey,
    PublicKey = index.PublicKey,
    Address = index.Address

/* keylocker Tests */

var masterPrivateKeychain = null,
    accountPrivateKeychain = null,
childPrivateKeychain = null,
    accountPublicKeychain = null,
    accountNumber = 0,
    childNumber = 2,
    childKeyName = 'blockstack.org',
    secretHash = null


function testPrivateKeychain() {
    test('prototypeFromSeed', function(t) {
        t.plan(3)
        
  var masterPrivateKeychainString = 'xprv9s21ZrQH143K4VRgygdbT9byKkWYJ5R73kNvFePJ7Hh7gA1Jic4NV4AnZmYs3fftKRdzMCHEaUFuYg7aApu99RDj9ZfA6KRXniK6r3VYRPV'
        masterPrivateKeychain = new PrivateKeychain(masterPrivateKeychainString)
        t.ok(masterPrivateKeychain, 'master private keychain created')
        t.equal(masterPrivateKeychain.toString(), masterPrivateKeychainString, 'master keychain string equal to reference value')
        t.ok(masterPrivateKeychain.hdKeychain instanceof HDPrivateKey, 'master keychain is an HDPrivateKey')
    })

    test('prototypeWithoutSeed', function(t) {
        t.plan(2)

        masterPrivateKeychain = new PrivateKeychain()
        t.ok(masterPrivateKeychain, 'master private keychain created')
        t.ok(masterPrivateKeychain.hdKeychain instanceof HDPrivateKey, 'master keychain is an HDPrivateKey')
    })
