let amostra = [
    {id:1,febre:false,tosse:false,probRespiracao:false,infectado:false},
    {id:2,febre:true,tosse:true,probRespiracao:true,infectado:true},
    {id:3,febre:true,tosse:true,probRespiracao:false,infectado:false},
    {id:4,febre:true,tosse:false,probRespiracao:true,infectado:true},
    {id:5,febre:true,tosse:true, probRespiracao:true,infectado:true},
    {id:6,febre:false,tosse:true,probRespiracao:false,infectado:false},
    {id:7,febre:true,tosse:false,probRespiracao:true,infectado:true},
    {id:8,febre:true,tosse:false,probRespiracao:true,infectado:true},
    {id:9,febre:false,tosse:true,probRespiracao:true,infectado:true},
    {id:10,febre:true,tosse:true,probRespiracao:false,infectado:true},
    {id:11,febre:false,tosse:true,probRespiracao:false,infectado:false},
    {id:12,febre:false,tosse:true,probRespiracao:true,infectado:true},
    {id:13,febre:false,tosse:true,probRespiracao:true,infectado:false},
    {id:14,febre:true,tosse:true,probRespiracao:false,infectado:false}
]
let propriedades =["febre","tosse","probRespiracao"]
let arvore = {
    sim:undefined,
    nao:undefined,
    value:undefined
}

function buscarFrequencia(amostra){
    let fv=[],ff=[];
    let tv=[],tf=[];
    let pv=[],pf=[];
    let iv=[],ifalse=[];
    let quanTotal = 0;

    for(let i =0;i<amostra.length;i++){
        if(amostra[i].febre=== true){
            fv.push(amostra[i])
        }else{
            ff.push(amostra[i])
        }
        if(amostra[i].tosse=== true){
            tv.push(amostra[i])
        }else{
            tf.push(amostra[i])
        }
        if(amostra[i].probRespiracao=== true){
            pv.push(amostra[i])
        }else{
            pf.push(amostra[i])
        }
        if(amostra[i].infectado=== true){
            iv.push(amostra[i])
        }else{
            ifalse.push(amostra[i])
        }
        quanTotal++
    }
    let response = {'febre':fv,'tosse':tv,'probRespiracao':pv,'infectado':iv,'quanTotal':quanTotal,'febref':ff,'tossef':tf,'probRespiracaof':pf,'infectadof':ifalse};
    return response
}
function entropiaGeral(amostra){
    let frequencia = buscarFrequencia(amostra)
   return  (-(frequencia.infectado.length/frequencia.quanTotal)*Math.log2(frequencia.infectado.length/frequencia.quanTotal) - ((frequencia.quanTotal - frequencia.infectado.length)/frequencia.quanTotal)*Math.log2((frequencia.quanTotal - frequencia.infectado.length)/frequencia.quanTotal)).toFixed(2)
}
function buscarInfectado(amostra){
    let infectados=[];
    let infectadosF=[];
    for(let i=0;i<amostra.length;i++){

        if(amostra[i].infectado === true){
            infectados.push(amostra[i])
        }
        else{
            infectadosF.push(amostra[i])
        }
    }
    return {'infectados':infectados,'infectadosF':infectadosF}
}
function numeroInvalido(numero){
    if(isNaN(numero)||numero === -Infinity){
        return numero = 0;
    }
    else{
        return numero
    }
}
function ganhoClasse(classe,amostra){
    let classef=classe+'f';
    let frequencia = buscarFrequencia(amostra)
    let frequenciaClasseTrue = frequencia[classe]
    let frequenciaClasseFalse = frequencia[classef]
    let frequenciaClasseTrueQnt = frequencia[classe].length
    let frequenciaClasseFalseQnt = frequencia[classef].length
    let frequenciaClasseTrueInfectados = buscarInfectado(frequenciaClasseTrue).infectados.length
    let frequenciaClasseFalseInfectados = buscarInfectado(frequenciaClasseFalse).infectados.length
    let frequenciaClasseTrueNaoInfectados = buscarInfectado(frequenciaClasseTrue).infectadosF.length
    let frequenciaClasseFalseNaoInfectados = buscarInfectado(frequenciaClasseFalse).infectadosF.length
    console.log()
    console.log("TRUE INFECTADOS: "+frequenciaClasseTrueInfectados)
    console.log("TRUE NAO INFECTADOS: "+frequenciaClasseTrueNaoInfectados)
    console.log("TRUE QUANTIDADE TOTAL: "+frequenciaClasseTrueQnt)
    console.log('');
    console.log("FALSE INFECTADOS: "+frequenciaClasseFalseInfectados)
    console.log("FALSE NAO INFECTADOS: "+frequenciaClasseFalseNaoInfectados)
    console.log("FALSE QUANTIDADE TOTAL: "+frequenciaClasseFalseQnt)
    console.log('');
    let primeiroLogTrue = numeroInvalido( Math.log2(frequenciaClasseTrueInfectados/frequenciaClasseTrueQnt));
    let segundoLogTrue = numeroInvalido( Math.log2(frequenciaClasseTrueNaoInfectados/frequenciaClasseTrueQnt));
   
    
    let entropiaTrue = (-(frequenciaClasseTrueInfectados/frequenciaClasseTrueQnt)*primeiroLogTrue -(frequenciaClasseTrueNaoInfectados/frequenciaClasseTrueQnt)*segundoLogTrue)
    entropiaTrue = parseFloat(entropiaTrue)

    // console.log(frequenciaClasseFalseInfectados)
    // console.log(frequenciaClasseFalseNaoInfectados)
    // console.log(frequenciaClasseFalseQnt)
    let primeiroLogFalse = numeroInvalido(Math.log2(frequenciaClasseFalseInfectados/frequenciaClasseFalseQnt));
    let segundoLogFalse = numeroInvalido(Math.log2(frequenciaClasseFalseNaoInfectados/frequenciaClasseFalseQnt));
    let entropiaFalse = (-(frequenciaClasseFalseInfectados/frequenciaClasseFalseQnt)* primeiroLogFalse -(frequenciaClasseFalseNaoInfectados/frequenciaClasseFalseQnt)*segundoLogFalse)
    entropiaFalse = parseFloat(entropiaFalse)
    // console.log('');
    console.log(classe)
     console.log("ENTROPIA TRUE: "+entropiaTrue);
     console.log("ENTROPIA FALSE: "+entropiaFalse);
    let entropia = parseFloat(entropiaGeral(amostra))
     console.log("ENTROPIA GERAL: "+entropia)
    let ganhoClasse = (entropia - (frequenciaClasseTrueQnt/frequencia.quanTotal)*entropiaTrue - (frequenciaClasseFalseQnt/frequencia.quanTotal) * entropiaFalse).toFixed(2)
    console.log("GANHO CLASSE: "+ganhoClasse)
    return parseFloat(ganhoClasse)
}

function induzirArvore(propriedades,amostra){
    console.log(amostra)
    let propriedadeGanho = []
    if(propriedades.length<=0){
        return 0
    }else{
    for(let i = 0;i<propriedades.length;i++){
        propriedadeGanho.push(ganhoClasse(propriedades[i],amostra))
    }
    let maiorGanho = Math.max.apply(null, propriedadeGanho );
    
    let maiorGanhoElemento =propriedadeGanho.indexOf(maiorGanho)
    // console.log(propriedades[maiorGanhoElemento])
    
    // console.log(propriedades)
    let amostraMaiorGanho
    if(countRecursiva===0){
        let frequenciaGeral = buscarFrequencia(amostra)
        amostraMaiorGanho= frequenciaGeral[propriedades[maiorGanhoElemento]]
    }else{
        amostraMaiorGanho=amostra
    }
    // console.log(amostraMaiorGanho)
    
    if(arvore.value=== undefined){
        arvore.value=propriedades[maiorGanhoElemento]
    }else{
        if(arvore.sim=== undefined){
            arvore.sim= {sim:undefined,nao:undefined,value:propriedades[maiorGanhoElemento]}
        }else{
            if(arvore.nao=== undefined){
                arvore.nao = {sim:undefined,nao:undefined,value:propriedades[maiorGanhoElemento]}
                
                return 
            }
        }
    }
    console.log(arvore)
    propriedades.splice(maiorGanhoElemento,1)
    // console.log(propriedades)
    countRecursiva++
    induzirArvore(propriedades,amostraMaiorGanho)
    // ADICIONAR NA ARVORE
    //CHAMAR RECURSIVAMENTE
    }
}
let countRecursiva = 0;
induzirArvore(propriedades,amostra)
console.log(arvore)
