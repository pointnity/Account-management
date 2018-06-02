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
