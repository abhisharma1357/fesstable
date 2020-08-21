// const Truample = artifacts.require('Truample.sol');
// const rebaseContract = artifacts.require('rebaseContract.sol');
// const Oracle = artifacts.require('Oracle.sol');

// const { increaseTimeTo, duration } = require('openzeppelin-solidity/test/helpers/increaseTime');
// const { latestTime } = require('openzeppelin-solidity/test/helpers/latestTime');

// var Web3 = require("web3");
// var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// var Web3Utils = require('web3-utils');

// contract('Rebase Contract', async (accounts) => {

//     it('Should correctly initialize constructor of Truample token Contract', async () => {

//         this.tokenhold = await Truample.new(accounts[0], { gas: 600000000 });

//     });

//     it('Should correctly initialize constructor of Rebase token Contract', async () => {

//         this.rebasehold = await rebaseContract.new(this.tokenhold.address, { from : accounts[0], gas: 600000000 });

//     });

//     it('Should check a owner of a rebase contract', async () => {

//         let owner = await this.rebasehold.owner.call();
//         assert.equal(owner, 0x0000000000000000000000000000000000000000);

//     });

//     it('Should correctly initialize constructor of Oracle token Contract', async () => {

//         this.oraclehold = await Oracle.new({ from : accounts[0], gas: 600000000 });

//     });

//     it('Should not be able to call rebaseFunction of token contract when rebase address is not initialised', async () => {
         
//        try {

//           await this.tokenhold.rebase(12345, 2200000);

//         } catch (error) {
//             var error_ = 'Returned error: VM Exception while processing transaction: revert rebase address not set yet -- Reason given: rebase address not set yet.';
//             assert.equal(error.message, error_, 'Reverted ');
//         }
//     });

//     it('Should not set the address of rebaseContract to token Contract from non owner account', async () => {

//        try {

//        await this.tokenhold.setRebaseContractAddress(this.rebasehold.address, {from : accounts[1]});

//         } catch (error) {
//             var error_ = 'Returned error: VM Exception while processing transaction: revert';
//             assert.equal(error.message, error_, 'Reverted ');
//         }
         
//     });

//     it('Should set the address of rebaseContract to token Contract', async () => {

//        await this.tokenhold.setRebaseContractAddress(this.rebasehold.address);         

//     });

//     it('Should check rebase address in token Contract', async () => {

//         let reBaseContractAddress = await this.tokenhold.reBaseContractAddress.call();
//         assert.equal(reBaseContractAddress, this.rebasehold.address);

//     });

//     it('Should not be able to call rebaseFunction of token contract by non rebase Contract or by wallet address', async () => {
         
//        try {
//        await this.tokenhold.setRebaseContractAddress(this.rebasehold.address);

//         } catch (error) {
//             var error_ = 'Returned error: VM Exception while processing transaction: revert';
//             assert.equal(error.message, error_, 'Reverted ');
//         }
//     });

//     it('Should be able to initialize rebase contract', async () => {

//        await this.rebasehold.initilize(accounts[0],1,web3.utils.toHex(3000000 * 10 ** 9), this.tokenhold.address);         

//     });

//     it('Should Not be able to initialize rebase contract again', async () => {

//        try {
//        await this.rebasehold.initilize(accounts[0],1,web3.utils.toHex(3000000 * 10 ** 9), this.tokenhold.address);

//         } catch (error) {
//             var error_ = 'Returned error: VM Exception while processing transaction: revert Contract instance has already been initialized -- Reason given: Contract instance has already been initialized.';
//             assert.equal(error.message, error_, 'Reverted ');
//         }
//     });


//     it('Should check minimum rebase time interval', async () => {

//         let minRebaseTimeIntervalSec = await this.rebasehold.minRebaseTimeIntervalSec.call();
//         assert.equal(minRebaseTimeIntervalSec, 86400);

//     });
    

//     it('Should check last rebase timestamp', async () => {

//         let lastRebaseTimestampSec = await this.rebasehold.lastRebaseTimestampSec.call();
//         assert.equal(lastRebaseTimestampSec, 0);

//     });    
    
//     it('Should check token contract address in rebase contract', async () => {

//         let tokenContractAddress = await this.rebasehold.tokenContractAddress.call();
//         assert.equal(tokenContractAddress, this.tokenhold.address);

//     });

//     it('Should check market orcle address when address is not set', async () => {

//         let marketOracle = await this.rebasehold.marketOracle.call();
//         assert.equal(marketOracle, 0x0);

//     });

//     it('Should check market orcle contract activation when oracle is inactive', async () => {

//         let oracleContractActivation = await this.rebasehold.oracleContractActivation.call();
//         assert.equal(oracleContractActivation, false);

//     });

//     it('Should check the value of epoch before rebase call', async () => {

//         let epoch = await this.rebasehold.epoch.call();
//         assert.equal(epoch.toNumber(), 0, "epoch");
//     });

//     it('Should check the rebaseLag Infor from struct at Epoch 0', async () => {

//         let values = await this.rebasehold.rebaseLog(0);
//          assert.equal(values[0].toNumber(), 0, "epoch");
//          assert.equal(values[1]/10**18, 1, "newOracleData");
//          assert.equal(values[2]/10**18, 0, "oraclePriceDelta");
//          assert.equal(values[3]/10**18, 0,"targetPriceDelta");
//          assert.equal(values[4]/10**18, 1,"newTargetPrice");
//          assert.equal(values[5]/10**9, 0,"supplyDelta");
//          assert.equal(values[6]/10**9, 3000000, "newSupply");

//          console.log(values[0].toNumber(), "epoch");
//          console.log(values[1]/10**18, "newOracleData");
//          console.log(values[2]/10**18, "oraclePriceDelta");
//          console.log(values[3]/10**18, "targetPriceDelta");
//          console.log(values[4]/10**18, "newTargetPrice");
//          console.log(values[5]/10**9, "supplyDelta");
//          console.log(values[6]/10**9, "newSupply");
//     });    

//     it('Should Not be able to call rebase by non owner account', async () => {
         
//        try {

//        await this.rebasehold.rebase({from : accounts[1]});

//         } catch (error) {
//             var error_ = 'Returned error: VM Exception while processing transaction: revert Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner.';
//             assert.equal(error.message, error_, 'Reverted ');
//         }
         
//     });

//     it('Should check market orcle address before setting oracle contract address', async () => {

//         let marketOracle = await this.rebasehold.marketOracle.call();
//         assert.equal(marketOracle, 0x0);

//     });

//     it('Should Not be able to set oracle contract address to rebase by Non Owner Account', async () => {
         
//        try {

//        await this.rebasehold.setOracleContractAddress(this.oraclehold.address, {from : accounts[2]});

//         } catch (error) {
//             var error_ = 'Returned error: VM Exception while processing transaction: revert Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner.';
//             assert.equal(error.message, error_, 'Reverted ');
//         }
//     });

//     it('Should be able to set oracle contract address to rebase', async () => {

//        await this.rebasehold.setOracleContractAddress(this.oraclehold.address, {from : accounts[0]});         

//     });

//     it('Should check market orcle address after setting oracle contract address', async () => {

//         let marketOracle = await this.rebasehold.marketOracle.call();
//         assert.equal(marketOracle, this.oraclehold.address);

//     });

//     it('Should check market orcle contract activation when oracle is inactive even address is setup', async () => {

//         let oracleContractActivation = await this.rebasehold.oracleContractActivation.call();
//         assert.equal(oracleContractActivation, false);

//     });

//     it('Should be able to set oracle contract activation true', async () => {

//        await this.rebasehold.setOracleContractActivation(true, {from : accounts[0]});         

//     });

//     it('Should check market orcle contract activation when oracle is active and address is setup', async () => {

//         let oracleContractActivation = await this.rebasehold.oracleContractActivation.call();
//         assert.equal(oracleContractActivation, true);

//     });

//     it('Should be able to set oracle contract activation false and enable manual rebase', async () => {

//        await this.rebasehold.setOracleContractActivation(false, {from : accounts[0]});         

//     });

//     it('Should be able to set oracle contract activation false and enable manual rebase', async () => {

//        await this.rebasehold.setOracleContractActivation(false, {from : accounts[0]});         

//     });

//     it('Should Not be able to set value of new oracle by manually by non owner account', async () => {

         
//        try {

//        await this.rebasehold.setRebasemanually(web3.utils.toHex(2* 10 ** 18), {from : accounts[1]});

//         } catch (error) {
//             var error_ = 'Returned error: VM Exception while processing transaction: revert Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner.';
//             assert.equal(error.message, error_, 'Reverted ');
//         }

//     });

//     it('Should be able to set value of new oracle by manually', async () => {

//        await this.rebasehold.setRebasemanually(web3.utils.toHex(2* 10 ** 18), {from : accounts[0]});         

//     });

//     it('Should Not be able to call rebase by non owner account', async () => {
         
//        try {

//        await this.rebasehold.rebase({from : accounts[1]});

//         } catch (error) {
//             var error_ = 'Returned error: VM Exception while processing transaction: revert Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner.';
//             assert.equal(error.message, error_, 'Reverted ');
//         }
         
//     });

//     it('Should check last oracle call time', async () => {

//         let lastOracleCallTime = await this.rebasehold.lastOracleCallTime.call();
//         console.log(lastOracleCallTime.toNumber());

//     });

//     it('Should be able to call rebase function', async () => {

//        await this.rebasehold.rebase({from : accounts[0]});         

//     });

//     it('Should check the rebaseLag Infor from struct at Epoch 1', async () => {

//         let values = await this.rebasehold.rebaseLog(1);
//          assert.equal(values[0].toNumber(), 1, "epoch");
//          assert.equal(values[1]/10**18, 2, "newOracleData");
//          assert.equal(values[2]/10**18, 1, "oraclePriceDelta");
//          assert.equal(values[3]/10**18, 0.5,"targetPriceDelta");
//          assert.equal(values[4]/10**18, 1.5,"newTargetPrice");
//          assert.equal(values[5]/10**9, 150000,"supplyDelta");
//          assert.equal(values[6]/10**9, 3150000, "newSupply");
//     });

//     it('Should check the total supply of a token contract', async () => {

//         let totalSupply = await this.tokenhold.totalSupply.call();
//         assert.equal(totalSupply.toNumber(),3150000000000000);

//     });

//     it('Should check a balance of a owner', async () => {

//         let owner = await this.tokenhold.balanceOf.call(accounts[0]);
//         assert.equal(owner.toNumber(),3150000000000000);

//     });

//     it('Should be able to transfer token to other accounts[1] from owner account', async () => {

//         await this.tokenhold.transfer(accounts[1],web3.utils.toHex(100 * 10 ** 9), {from : accounts[0]});

//     }); 

//     it('Should check a balance of a owner after sending tokens', async () => {

//         let owner = await this.tokenhold.balanceOf.call(accounts[0]);
//         assert.equal(owner.toNumber()/10**9,3149900);

//     });

//     it('Should check a balance of a receiver after receiving tokens', async () => {

//         let owner = await this.tokenhold.balanceOf.call(accounts[1]);
//         assert.equal(owner.toNumber()/10**9,100);

//     });

//     it('Should be able to transfer token to other accounts[2] from owner account', async () => {

//         await this.tokenhold.transfer(accounts[2],web3.utils.toHex(1000 * 10 ** 9), {from : accounts[0]});

//     });   

//     it('Should check a balance of a owner after sending tokens', async () => {

//         let owner = await this.tokenhold.balanceOf.call(accounts[0]);
//         assert.equal(owner.toNumber()/10**9,3148900);

//     });

//     it('Should check a balance of a receiver after receiving tokens', async () => {

//         let owner = await this.tokenhold.balanceOf.call(accounts[2]);
//         assert.equal(owner.toNumber()/10**9,1000);

//     });

//     it('Should be able to transfer token to other accounts[3] from owner account', async () => {

//         await this.tokenhold.transfer(accounts[3],web3.utils.toHex(10000 * 10 ** 9), {from : accounts[0]});

//     });

//     it('Should check a balance of a owner after sending tokens', async () => {

//         let owner = await this.tokenhold.balanceOf.call(accounts[0]);
//         assert.equal(owner.toNumber()/10**9,3138900);

//     });

//     it('Should check a balance of a receiver after receiving tokens', async () => {

//         let owner = await this.tokenhold.balanceOf.call(accounts[3]);
//         assert.equal(owner.toNumber()/10**9,10000);

//     });

//     it('Should Not be able to call rebase function by owner account before 1 day interval from last call', async () => {

         
//        try {

//        await this.rebasehold.rebase({from : accounts[0]});

//         } catch (error) {
//             var error_ = 'Returned error: VM Exception while processing transaction: revert to hurry to call rebase -- Reason given: to hurry to call rebase.';
//             assert.equal(error.message, error_, 'Reverted ');
//         }
//     });

//     it('Should be able to increase time to get second rebase call ', async () => {

//         this.openingTime = (await latestTime());
//         await increaseTimeTo(this.openingTime + duration.seconds(86500));

//     });

//     it('Should Not be able to call rebase function before calling set oracle manually within minimum time', async () => {

//        try {

//        await this.rebasehold.rebase({from : accounts[0]});

//         } catch (error) {
//             var error_ = 'Returned error: VM Exception while processing transaction: revert oracle window is valid upto 15 minutes after price feed -- Reason given: oracle window is valid upto 15 minutes after price feed.';
//             assert.equal(error.message, error_, 'Reverted ');
//         }
//     });

//     it('Should be able to set value of new oracle by manually for Epoch 2', async () => {

//        await this.rebasehold.setRebasemanually(web3.utils.toHex(3* 10 ** 18), {from : accounts[0]});         

//     });

//     it('Should check last oracle call time', async () => {

//         let lastOracleCallTime = await this.rebasehold.lastOracleCallTime.call();
//         console.log(lastOracleCallTime.toNumber());

//     });

//     it('Should be able to call rebase function', async () => {

//        await this.rebasehold.rebase({from : accounts[0]});         

//     });

//     it('Should check the rebaseLag Infor from struct at Epoch 2', async () => {

//         let values = await this.rebasehold.rebaseLog(2);
//          assert.equal(values[0].toNumber(), 2, "epoch");
//          assert.equal(values[1]/10**18, 3, "newOracleData");
//          assert.equal(values[2]/10**18, 1, "oraclePriceDelta");
//          assert.equal(values[3]/10**18, 0.5,"targetPriceDelta");
//          assert.equal(values[4]/10**18, 2,"newTargetPrice");
//          assert.equal(values[5]/10**9, 315000,"supplyDelta");
//          assert.equal(values[6]/10**9, 3465000, "newSupply");
//     });

//     it('Should check the total supply of a token contract', async () => {

//         let totalSupply = await this.tokenhold.totalSupply.call();
//         assert.equal(totalSupply.toNumber(),3465000000000000);

//     });

//     it('Should check a balance of a owner', async () => {

//         let owner = await this.tokenhold.balanceOf.call(accounts[0]);
//         assert.equal(owner.toNumber()/10**9,3452790);

//     });

//     it('Should check a balance of a accounts[1]', async () => {

//         let owner = await this.tokenhold.balanceOf.call(accounts[1]);
//         assert.equal(owner.toNumber()/10**9,110);

//     });

//     it('Should check a balance of a accounts[2]', async () => {

//         let owner = await this.tokenhold.balanceOf.call(accounts[2]);
//         assert.equal(owner.toNumber()/10**9,1100);

//     });

//     it('Should check a balance of a accounts[3]', async () => {

//         let owner = await this.tokenhold.balanceOf.call(accounts[3]);
//         assert.equal(owner.toNumber()/10**9,11000);

//     });

//     it('Should check a owner of a token before transferring ownership', async () => {

//         let owner = await this.rebasehold.owner.call();
//         assert.equal(owner, accounts[0]);

//     });

//     it('Should not be able to transfer ownership by non owner account ', async () => {

//        try {
//         await this.rebasehold.transferOwnership(accounts[9], {from : accounts[9]});
//         } catch (error) {
//             var error_ = 'Returned error: VM Exception while processing transaction: revert Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner.';
//             assert.equal(error.message, error_, 'Reverted ');
//         }

//     });

//     it('Should be able to transfer ownership ', async () => {

//       await this.rebasehold.transferOwnership(accounts[9]);

//     });

//     it('Should check a owner of a token after transferring ownership', async () => {

//         let owner = await this.rebasehold.owner.call();
//         assert.equal(owner, accounts[9]);

//     });

//     it('Should not set rebase timing parameter by non owner accounts', async () => {

//        try {

//        await this.rebasehold.setRebaseTimingParameters(172800,60, {from : accounts[3]});

//         } catch (error) {
//             var error_ = 'Returned error: VM Exception while processing transaction: revert Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner.';
//             assert.equal(error.message, error_, 'Reverted ');
//         }
         
//     });

//     it('Should set rebase timing parameter by non owner accounts', async () => {

//        await this.rebasehold.setRebaseTimingParameters(172800,60, {from : accounts[9]});

//     });

//     it('Should not be able to reannounce ownership by non owner account ', async () => {

//        try {
//         await this.rebasehold.renounceOwnership({from : accounts[0]});
//         } catch (error) {
//             var error_ = 'Returned error: VM Exception while processing transaction: revert Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner.';
//             assert.equal(error.message, error_, 'Reverted ');
//         }

//     });

//     it('Should be able to reannounce ownership by owner accounts', async () => {

//         await this.rebasehold.renounceOwnership({from : accounts[9]});

//     });
//     })


    