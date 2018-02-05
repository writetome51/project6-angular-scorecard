class TestClass{
	private _thing = '';

	get thing(){
		return this._thing;
	}

	set thing(value: string){
		this._thing = 'This is the ' + value;
	}
}


let test = new TestClass();
test.thing = 'beast';
console.log(test.thing);
console.log()
