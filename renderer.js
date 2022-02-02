  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });

  

  var el = document.getElementById("calculador");
  el.addEventListener("click",function(){
    
      let sistolica=parseFloat( 
        document.querySelector("#sistolica").value
      );
      let diastolica=parseFloat( 
        document.querySelector("#diastolica").value
      );
      let ta=miTA(sistolica,diastolica);
      let evaluacion=IA({
        S:sistolica/300,
        D:diastolica/300
      });
      let recomendacion;

      if(evaluacion=="Hipertenso"){
        recomendacion=`
        <ul>
          <li>Perder peso más y vigilar el mismo</li>
        <li>Hacer ejercicio regularmente</li>
        <li>Comer sano</li>
        <li>Reducir el sodio en la alimentación</li>
        <li>Restringir la cantidad de alcohol ingerida</li>
        </ul>
        `;
      }else if(evaluacion=="Normal"){
        recomendacion=`
        <ul>
          <li>Comer una dieta saludable: Para ayudar a controlar su presión arterial, debe limitar la cantidad de sodio (sal) que come y aumentar la cantidad de potasio en su dieta </li>
        <li>Hacer ejercicio regularmente: El ejercicio le puede ayudar a mantener un peso saludable y a bajar la presión arterial </li>
        </ul>
        `;
      }else if(evaluacion=="Baja"){
        recomendacion=`
        <ul style="line-height:2em">
        <li>
          No bebas alcohol. El alcohol puede contribuir a bajar la presión arterial.
        </li>
        <li>
          Conoce tus medicamentos. Consulta a tu médico si alguno de los medicamentos que tomas puede afectar a tu presión arterial.
        </li>
        <li>
          Sigue una dieta saludable rica en frutas, vegetales y cereales integrales. Tu médico quizá también te sugiera agregar más sal a tu dieta para aumentar la presión arterial.
        </li>
        <li>
          Bebe abundante agua para evitar la deshidratación.
        </li>
        <li>
          Infórmale a tu médico si tienes presión arterial baja y antecedentes de diabetes, afecciones hepáticas, renales o cardíacas.
        </li>
        </ul>
        `;
      }

      document.
      querySelector("#TA").innerHTML=ta+" mmHg";
      document.
      querySelector("#evaluacion").innerHTML=evaluacion;
      document.
      querySelector("#recomendaciones").innerHTML=recomendacion;


  }, false);

    
function miTA(s,d){
  let respuesta;
    respuesta=s-d;
    respuesta=respuesta/3;
    respuesta+=s;
  return round(respuesta,2);
}//ta

function round(a,b=0){
  return Math.round((a)*(Math.pow(10,b)))/(Math.pow(10,b));
}//round

function IA(data){
  let respuesta;
  const redNeuronal = new brain.NeuralNetwork();
  const datos=[
    {
      "input":{"S":0.44,"D":0.3},
      "output":{"Hipertenso":1},
    },//end 
    {
      "input":{"S":0.4,"D":0.26},
      "output":{"Normal":1},
    },//end 
    {
      "input":{"S":0.27,"D":0.2},
      "output":{"Baja":1},
    },//end 
  ];

  redNeuronal.train(datos);

  respuesta=brain.likely(data,redNeuronal);

  return respuesta;
}//end