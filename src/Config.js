// Copyright (C) 2018, Zpalmtree
//
// Please see the included LICENSE file for more information.

import { Platform } from 'react-native';

import { MixinLimit, MixinLimits, Daemon } from 'plenteum-wallet-backend';

import {
    derivePublicKey, generateKeyDerivation, generateRingSignatures,
    deriveSecretKey, generateKeyImage,
} from './NativeCode';

const Config = {
    /**
     * If you can't figure this one out, I don't have high hopes
     */
    coinName: 'Plenteum',

    /**
     * Prefix for URI encoded addresses
     */
    uriPrefix: 'plenteum://',

    /**
     * How often to save the wallet, in milliseconds
     */
    walletSaveFrequency: 60 * 1000,

    /**
     * The amount of decimal places your coin has, e.g. Plenteum has eight
     * decimals
     */
    decimalPlaces: 8,

    /**
     * The address prefix your coin uses - you can find this in CryptoNoteConfig.h.
     * In Plenteum, this converts to PLe
     */
    addressPrefix: 18181,

    /**
     * Request timeout for daemon operations in milliseconds
     */
    requestTimeout: 10 * 1000,

    /**
     * The block time of your coin, in seconds
     */
    blockTargetTime: 120,

    /**
     * How often to process blocks, in millseconds
     */
    syncThreadInterval: 4,

    /**
     * How often to update the daemon info, in milliseconds
     */
    daemonUpdateInterval: 15 * 1000,

    /**
     * How often to check on locked transactions
     */
    lockedTransactionsCheckInterval: 15 * 3000,

    /**
     * The amount of blocks to process per 'tick' of the mainloop. Note: too
     * high a value will cause the event loop to be blocked, and your interaction
     * to be laggy.
     */
    blocksPerTick: 1,

    /**
     * Your coins 'ticker', generally used to refer to the coin, i.e. 123 PLE
     */
    ticker: 'PLE',

    /**
     * Most people haven't mined any blocks, so lets not waste time scanning
     * them
     */
    scanCoinbaseTransactions: false,

    /**
     * The minimum fee allowed for transactions, in ATOMIC units
     */
    minimumFee: 0,

    /**
     * Mapping of height to mixin maximum and mixin minimum
     */
    mixinLimits: new MixinLimits([
        /* Height: 0, minMixin: 0, maxMixin: 100, defaultMixin: 3 */
        new MixinLimit(0, 0, 7, 0),

    ], 0 /* Default mixin of 0 */),

    /**
     * The length of a standard address for your coin
     */
    standardAddressLength: 98,

    /**
     * The length of an integrated address for your coin - It's the same as
     * a normal address, but there is a paymentID included in there - since
     * payment ID's are 64 chars, and base58 encoding is done by encoding
     * chunks of 8 chars at once into blocks of 11 chars, we can calculate
     * this automatically
     */
    integratedAddressLength: 98 + ((64 * 11) / 8),

    /**
     * Use our native func instead of JS slowness
     */
    derivePublicKey: Platform.OS === 'ios' ? undefined : derivePublicKey,

    /**
     * Use our native func instead of JS slowness
     */
    generateKeyDerivation: Platform.OS === 'ios' ? undefined : generateKeyDerivation,

    /**
     * Use our native func instead of JS slowness
     */
    generateRingSignatures: Platform.OS === 'ios' ? undefined : generateRingSignatures,

    /**
     * Use our native func instead of JS slowness
     */
    deriveSecretKey: Platform.OS === 'ios' ? undefined : deriveSecretKey,

    /**
     * Use our native func instead of JS slowness
     */
    generateKeyImage: Platform.OS === 'ios' ? undefined : generateKeyImage,

    /**
     * Memory to use for storing downloaded blocks - 3MB
     */
    blockStoreMemoryLimit: 1024 * 1024 * 3,

    /**
     * Amount of blocks to request from the daemon at once
     */
    blocksPerDaemonRequest: 100,

    /**
     * Unix timestamp of the time your chain was launched.
     *
     * Note - you may want to manually adjust this. Take the current timestamp,
     * take away the launch timestamp, divide by block time, and that value
     * should be equal to your current block count. If it's significantly different,
     * you can offset your timestamp to fix the discrepancy
     */
    chainLaunchTimestamp: new Date(1000 * 1533106800),

    /**
     * Fee to take on all transactions, in percentage
     */
    devFeePercentage: 0,

    /**
     * Address to send dev fee to
     */
    devFeeAddress: 'PLearxtECBsKFLLeX3edPMEk4ncvZGkJQ7FpPyG3ADGtYbFj7FC5ELWXS2B7wRDfjwSqEwZVp7pwjbWCAhmGJp7z94TQzpNUkP',

    /**
     * Base url for price API
     *
     * The program *should* fail gracefully if your coin is not supported, or
     * you just set this to an empty string. If you have another API you want
     * it to support, you're going to have to modify the code in Currency.js.
     */
    priceApiLink: 'https://api.coingecko.com/api/v3/simple/price',

    /**
     * Default daemon to use. Can either be a BlockchainCacheApi(baseURL, SSL),
     * or a ConventionalDaemon(url, port).
     */
    defaultDaemon: new Daemon('cache.pleapps.plenteum.com', 443),

    /**
     * A link to where a bug can be reported for your wallet. Please update
     * this if you are forking, so we don't get reported bugs for your wallet...
     *
     */
    repoLink: 'https://github.com/plenteum/plenteum-mobile-wallet/issues',

    /**
     * This only controls the name in the settings screen.
     */
    appName: 'PleWallet',

    /**
     * Slogan phrase during wallet CreateScreen
     */
    sloganCreateScreen: 'Transaction Fees, East our Dust!',

    /**
     * Displayed in the settings screen
     */
    appVersion: 'v0.2.0',

    /**
     * Base URL for us to chuck a hash on the end, and find a transaction
     */
    explorerBaseURL: 'http://block-explorer.plenteum.com/?hash=',

    /**
     * A link to your app on the Apple app store. Currently blank because we
     * haven't released for iOS yet...
     */
    appStoreLink: '',

    /**
     * A link to your app on the google play store
     * Also not released yet, but linking to old wallet
     */
    googlePlayLink: 'https://play.google.com/store/apps/details?id=com.plenteum.wallet',
};

module.exports = Config;
