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
   test('account', function(t) {
        t.plan(2)

        accountPrivateKeychain = masterPrivateKeychain.account(accountNumber)
        t.ok(accountPrivateKeychain, 'account private keychain created')
        t.ok(accountPrivateKeychain.hdKeychain instanceof HDPrivateKey, 'account keychain is an HDPrivateKey')
    })
    })

    test('child', function(t) {
        t.plan(2)

        childPrivateKeychain = accountPrivateKeychain.child(childNumber)
        t.ok(childPrivateKeychain, 'child private keychain created')
        t.ok(childPrivateKeychain.hdKeychain instanceof HDPrivateKey, 'child keychain is an HDPrivateKey')
    })

    test('publicKeychain', function(t) {
        t.plan(2)

        accountPublicKeychain = accountPrivateKeychain.publicKeychain()
        t.ok(accountPublicKeychain, 'account public keychain created')
        t.ok(accountPublicKeychain.hdKeychain instanceof HDPublicKey, 'account public keychain is an HDPublicKey')
    })

    test('privateKey', function(t) {
        t.plan(2)

        var childPrivateKey = childPrivateKeychain.privateKey()
        t.ok(childPrivateKey, 'child private key created')
        t.ok(childPrivateKey instanceof PrivateKey, 'child private key is a PrivateKey')
    })

    test('descendant', function(t) {
        t.plan(2)

        var privateKeychainString = 'xprv9s21ZrQH143K2vRPJpXPhcT12MDpL3rofvjagwKn4yZpPPFpgWn1cy1Wwp3pk78wfHSLcdyZhmEBQsZ29ZwFyTQhhkVVa9QgdTC7hGMB1br',
            referencePrivateKeyHex = '278a5de700e29faae8e40e366ec5012b5ec63d36ec77e8a2417154cc1d25383f',
            chainPathHash = 'bd62885ec3f0e3838043115f4ce25eedd22cc86711803fb0c19601eeef185e39'

        var privateKeychain = new PrivateKeychain(privateKeychainString),
            descendantPrivateKeychain = privateKeychain.descendant(chainPathHash),
            descendantPrivateKey = descendantPrivateKeychain.privateKey()
        
