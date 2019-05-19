namespace DeconstructMixin {
    interface ITest {
        [key: string]: string | number | boolean;
    }
    class Test {
        props: ITest = { s: "test", n: 0, b: true };
        constructor() {
            // console.log("Test constructed", this);
        }
    }

    class Test1 extends Test {
        constructor() {
            super();
            // copy props partially
            let { b, ...rest } = this.props;
            // change one value
            rest.s = "test1";
            rest.n = 1;
            // add prop
            rest.s1 = "test1";
            // overwrite props
            this.props = rest;
            console.log(this);
        }
    }

    class Test2 extends Test {
        constructor() {
            super();
            // copy props partially
            let { s, ...rest } = this.props;
            // change one value
            rest.b = "false";
            rest.n = 2;
            // add prop
            rest.s2 = "test2";
            // overwrite props
            this.props = rest;
            console.log(this);
        }
    }


    class MixStatic extends Test {
        constructor() {
            super();
            let test1: Test1 = new Test1();
            let test2: Test2 = new Test2();
            let props: ITest = {};
            Object.assign(props, test2.props);
            Object.assign(props, test1.props);
            this.props = props;
            console.log(this);
        }
    }

    class MixGeneric extends Test {
        constructor(...types: (typeof Test)[]) {
            super();
            let props: ITest = {};
            for (let type of types) {
                let part: Test = new type();
                Object.assign(props, part.props);
            }
            this.props = props;
            console.log(this);
        }
    }

    console.log("Create test1");
    let test1: Test1 = new Test1();
    console.log("Result", test1);
    console.log("Create test2");
    let test2: Test2 = new Test2();
    console.log("Result", test2);
    console.log("Create mixStatic");
    let mixStatic: MixStatic = new MixStatic();
    console.log("Result", mixStatic);
    console.log("Create mixGeneric");
    let mixGeneric: MixGeneric = new MixGeneric(Test1, Test2);
    console.log("Result", mixGeneric);
}