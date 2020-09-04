const FessChain = artifacts.require('FessChain.sol');
const Fessstable = artifacts.require('Fessstable.sol');

const { increaseTimeTo, duration } = require('openzeppelin-solidity/test/helpers/increaseTime');
const { latestTime } = require('openzeppelin-solidity/test/helpers/latestTime');

var Web3 = require("web3");
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var Web3Utils = require('web3-utils');

contract('FessChain Contract', async (accounts) => {


    it('Should correctly initialize constructor of FessChain token Contract', async () => {

        this.tokenhold = await FessChain.new(accounts[0], { gas: 600000000 });

    });

    it('Should correctly initialize constructor of Fee stable token Contract', async () => {

        this.stable = await Fessstable.new(accounts[0],accounts[9], 'FESS Stable' , 'FSSS', this.tokenhold.address, { gas: 600000000 });

    });

    it('Should check a name of a stable', async () => {

        let name = await this.stable.name.call();
        assert.equal(name, "FESS Stable");

    });

    it('Should check a symbol of a stable', async () => {

        let symbol = await this.stable.symbol.call();
        assert.equal(symbol, "FSSS");

    });

    it('Should check a decimal of a stable', async () => {

        let decimals = await this.stable.decimals.call();
        assert.equal(decimals, 18);

    });

    it('Should check a owner of a stable', async () => {

        let owner = await this.stable.owner.call();
        assert.equal(owner, accounts[0]);

    });

    it('Should check a totalSupply of a stable', async () => {

        let totalSupply = await this.stable.totalSupply.call();
        assert.equal(totalSupply, 0);

    });

    it('Should check a fess token address', async () => {

        let token = await this.stable.token.call();
        assert.equal(token, this.tokenhold.address);

    });

    it('Should check a fess fees value', async () => {

        let feesAmount = await this.stable.feesAmount.call();
        assert.equal(feesAmount/10**18, 0.1);

    });

    it('Should check a fess fees wallet address ', async () => {

        let feesWallet = await this.stable.feesWallet.call();
        assert.equal(feesWallet, accounts[9]);

    });

    it('Should check a fess rate change of swapping', async () => {

        let rate = await this.stable.rate.call();
        assert.equal(rate, 12);

    });

    it('Should check a staking Active or not', async () => {

        let stakingActive = await this.stable.stakingActive.call(accounts[1]);
        assert.equal(stakingActive, false);

    });

    it('Should check minting through owner only', async () => {

        await this.stable.mint(accounts[1], web3.utils.toHex(20* 10 ** 18));


    });

    it('Should check a totalSupply of a stable', async () => {

        let totalSupply = await this.stable.totalSupply.call();
        assert.equal(totalSupply/10**18, 20);

    });

    it('Should check a balance of a stablecoin by token holder', async () => {

        let balanceOf = await this.stable.balanceOf.call(accounts[1]);
        assert.equal(balanceOf/10**18,20);

    });

    it('Should check a balance of a owner of stable coin', async () => {

        let balanceOf = await this.stable.balanceOf.call(accounts[0]);
        assert.equal(balanceOf,0);

    });

    it('Should check a balance of a stablecoin by token holder', async () => {

        let balanceOf = await this.tokenhold.balanceOf.call(accounts[0]);
        assert.equal(balanceOf/10**18,10000000000);

    });


    it("should check approval by accounts 0 to stable coin address to spend tokens on the behalf of accounts 4", async () => {

        let allowance = await this.tokenhold.allowance.call(accounts[0], this.stable.address);
        assert.equal(allowance, 0, "allowance is wrong when approve");

    });

    it("should Approve stable coin to spend specific tokens of accounts[0]", async () => {

        this.tokenhold.approve(this.stable.address, web3.utils.toHex(200 * 10 ** 18), { from: accounts[0] });

    });

    it("should check approval by accounts 0 to stable to spend tokens on the behalf of accounts 0", async () => {

        let allowance = await this.tokenhold.allowance.call(accounts[0], this.stable.address);
        assert.equal(allowance/10**18, 200, "allowance is wrong when approve");

    });

    it("should be able to swap tokens of fess with stable coin", async () => {

        this.stable.swapTokens(web3.utils.toHex(100 * 10 ** 18), { from: accounts[0], value:web3.utils.toWei("0.1","ether") });

    });

    it('Should check a balance of a stablecoin address by token holder after swaping', async () => {

        let balanceOf = await this.tokenhold.balanceOf.call(this.stable.address);
        assert.equal(balanceOf/10**18,100);

    });

    it('Should check a balance of a stablecoin by token holder', async () => {

        let balanceOf = await this.tokenhold.balanceOf.call(accounts[0]);
        assert.equal(balanceOf/10**18,9999999900);

    });    

    it('Should check a balance of a stablecoin address by token holder after swaping', async () => {

        let balanceOf = await this.stable.balanceOf.call(accounts[0]);
        assert.equal(balanceOf/10**18,112);

    });

    it('Should check a ETH balance of a accounts 9', async () => {

       let campaignBalance = await web3.eth.getBalance(accounts[9]);

    });

    it("should check approval by accounts 0 to stable to spend tokens on the behalf of accounts 0", async () => {

        let allowance = await this.tokenhold.allowance.call(accounts[0], this.stable.address);
        assert.equal(allowance/10**18, 100, "allowance is wrong when approve");

    });

    it("should be able to stake tokens for 3 months", async () => {

        this.stable.staking(web3.utils.toHex(10 * 10 ** 18),3, { from: accounts[0]});

    });

    it('Should check a balance of a stablecoin address by token holder after swaping', async () => {

        let balanceOf = await this.tokenhold.balanceOf.call(this.stable.address);
        assert.equal(balanceOf/10**18,110);

    });

    it('Should check a balance of a stablecoin by token holder', async () => {

        let balanceOf = await this.tokenhold.balanceOf.call(accounts[0]);
        assert.equal(balanceOf/10**18,9999999890);

    });    

    it('Should check a staking Active or not', async () => {

        let stakingActive = await this.stable.stakingActive.call(accounts[0]);
        assert.equal(stakingActive, true);

    });

    it('Should check a staking parameters', async () => {

        let stakingEvent = await this.stable.stakingEvent.call(accounts[0]);
         console.log(stakingEvent[0].toString());
         console.log(stakingEvent[1].toString());
         console.log(stakingEvent[2].toString());
    });


    it('Should be able to increase time to get first cycle', async () => {

        this.openingTime = (await latestTime());
        await increaseTimeTo(this.openingTime + duration.seconds(7776000));

    });

    it("should be able to withdraw after 3 months", async () => {

        this.stable.withdrawStaking({ from: accounts[0]});

    });


    it('Should check a staking Active or not after staking done onces', async () => {

        let stakingActive = await this.stable.stakingActive.call(accounts[0]);
        assert.equal(stakingActive, false);

    });

    it('Should check a staking parameters', async () => {

        let stakingEvent = await this.stable.stakingEvent.call(accounts[0]);
         console.log(stakingEvent[0].toString());
         console.log(stakingEvent[1].toString());
         console.log(stakingEvent[2].toString());
    });

    // it("should be able to distribute", async () => {

    //     this.stable.distributeTokens([accounts[1],accounts[2]], [20* 10 ** 18, 20* 10 ** 18]);

    // });

    it("should be able to  set wallet address", async () => {

        this.stable.setWalletAddress(accounts[8]);

    });


    it('Should check a fess fees wallet address ', async () => {

        let feesWallet = await this.stable.feesWallet.call();
        assert.equal(feesWallet, accounts[8]);

    });


    it("should be able to  set wallet address", async () => {

        this.stable.setbaseFees({value:web3.utils.toWei("0.5","ether")});

    });

    it('Should check a fess fees value', async () => {

        let feesAmount = await this.stable.feesAmount.call();
        assert.equal(feesAmount/10**18, 0.5);

    });


    it("should be able to  set wallet address", async () => {

        this.stable.setRateOfConversion(25);

    });


    it('Should check a fess rate change of swapping', async () => {

        let rate = await this.stable.rate.call();
        assert.equal(rate, 25);

    });
})

