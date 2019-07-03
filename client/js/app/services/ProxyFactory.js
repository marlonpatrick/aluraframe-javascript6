class ProxyFactory{

    static create(objeto, props, acao){
        return new Proxy(objeto, {
            get(target, prop, receiver){

                if(props.includes(prop) && ProxyFactory._ehFuncao(target[prop])){

                    return function(){
                        let originalReturn = Reflect.apply(target[prop], target, arguments);
                        acao(target);
                        return originalReturn;
                    }
                }

                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver){
                let originalReturn = Reflect.set(target, prop, value, receiver);
                if(props.includes(prop)){
                    acao(target);
                }
                return originalReturn;
            }
        });
    }

    static _ehFuncao(func){
        return typeof(func) == typeof(Function);
    }
}