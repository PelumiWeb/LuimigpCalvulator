//UI controller
var uIController = (function () {
  var domElements = {
    course: document.querySelector(".input_course"),
    units: document.querySelector(".units"),
    grade: document.querySelector(".Select_grade-point"),
    btn: document.querySelector(".btn"),
    list: document.querySelector(".list_on"),
    option: document.querySelectorAll(".option2"),
    gradeSystem: document.querySelector(".grade_system"),
    totalGp: document.querySelector(".Total_GPA"),
    averageGrade: document.getElementById("Total_GPA"),
    courseTaken: document.querySelector(".course_taken"),
  };

  class CreateId {
    constructor(id, formular) {
      this.id = id;
      this.formular = formular;
    }
  }

  return {
    displayValue: function () {
      var inputCourse = domElements.course.value;
      var inputGrade = domElements.units.value;
      var inpputPoint = domElements.grade.value;
      var list = domElements.list;
      var range = [
        `(70 - 100)`,
        `(60 - 69)`,
        `(50 - 59)`,
        `(45 - 49)`,
        `(0 - 44)`,
      ];
      if (inpputPoint === "A") {
        range = range[0];
      } else if (inpputPoint === "B") {
        range = range[1];
      } else if (inpputPoint === "C") {
        range = range[2];
      } else if (inpputPoint === "D") {
        range = range[3];
      } else {
        range = range[4];
      }
      var arrayUnit = Array.from(inputGrade);
      arrayUnit[0];
      const object = [];
      console.log(object);
      // Getting Ids from the CalculateGP method

      var getIds = claculateGP.getTotalStores();
      var getIdsArr = getIds.totalId;
      var ID = getIdsArr.length - 1 + 1;
      getIdsArr.push(ID);
      console.log(getIdsArr);
      console.log(ID);
      const getId = new CreateId(ID, 4);
      object.push(getId);

      if (inputCourse !== "") {
        const markup = ` 
               <li>
                <div class="list" id="list-${ID}">
                <p class = "units">${arrayUnit[0]} units</p>
                  <h2 class="corse_code">${inputCourse}</h2>
                    <p class="course_grade">${inpputPoint} ${range}</p>
                   <button class="delete_button">
                  <a href="#" class="delete_btn">X</a>
                   </button>
                 </div>
                 </li>
                `;

        //Display it to the UI

        //puskMarkUp.push(markup)
        //console.log(puskMarkUp)

        list.insertAdjacentHTML("beforeend", markup);
        // const pushedMarkUp = [];
        // pushedMarkUp.push(markup);
        // const getMarkUp = localStorage.setItem("markUp", pushedMarkUp);
        // console.log(pushedMarkUp);
      } else {
        btn.removeEventListener("click", uIController.displayValue);
      }

      uIController.clearField();

      claculateGP.DoCalculations();
      return {
        getID: function () {
          return ID;
        },
      };
    },
    getDomstrings: function () {
      return domElements;
    },
    clearField: function () {
      var inputCourse = domElements.course;
      inputCourse.value = "";
    },

    displayVariousGPBoard: function () {
      var totalGp = document.querySelector(".Total_GPA");
      var gpaHeader = document.querySelector(".Gpa_header");
      var gpaPremium = document.querySelector(".Gpa_premium");
      var gpaPremiumSpan = document.querySelector(".Gpa_premium--span");
      var secondClassUpper = document.querySelector(".Gpa_2nd-class");

      function secondClassLowerRange(start3, end3) {
        var secondClassLowerArray = [];
        for (var i = start3; i <= end3; i += 0.01) {
          secondClassLowerArray.push(i.toFixed(2));
        }
        const splitTotalGp = totalGp.textContent.split(" ");
        const getSecondClassLowerArray = secondClassLowerArray.includes(
          splitTotalGp[0]
        );

        if (getSecondClassLowerArray) {
          totalGp.classList.add("Gpa_2nd_class-lower-span");
          gpaHeader.classList.add("Gpa_2nd_class-lower");
        } else if (getSecondClassLowerArray === false) {
          totalGp.classList.remove("Gpa_2nd_class-lower-span");
          gpaHeader.classList.remove("Gpa_2nd_class-lower");
        }
      }
      secondClassLowerRange(2.0, 2.99);

      function secondClassUpperRange(start2, end2) {
        var secondClassArray = [];
        for (var i = start2; i <= end2; i += 0.01) {
          secondClassArray.push(i.toFixed(2));
        }
        const splitTotalGp = totalGp.textContent.split(" ");
        const getSecondClassArray = secondClassArray.includes(splitTotalGp[0]);

        if (getSecondClassArray) {
          totalGp.classList.add("Gpa_2nd-class-span");
          gpaHeader.classList.add("Gpa_2nd-class");
        } else if (getSecondClassArray === false) {
          totalGp.classList.remove("Gpa_2nd-class-span");
          gpaHeader.classList.remove("Gpa_2nd-class");
        }
      }
      secondClassUpperRange(3.0, 3.49);

      function range(start, end) {
        var firstClass = [];
        for (var i = start; i <= end; i += 0.01) {
          firstClass.push(i.toFixed(2));
          var indexFirstClass = i.toFixed(2);
          const splitTotalGp = totalGp.textContent.split(" ");
          const getIt = firstClass.includes(splitTotalGp[0]);

          // First class
          if (getIt) {
            totalGp.classList.add("Gpa_premium--span");
            gpaHeader.classList.add("Gpa_premium");
            if (
              totalGp === secondClassUpper &&
              gpaHeader === secondClassUpper
            ) {
              totalGp.classList.remove("Gpa_2nd-class");
              gpaHeader.classList.remove("Gpa_2nd-class");
            }
          } else if (getIt === false) {
            // console.log('false')
            totalGp.classList.remove("Gpa_premium--span");
            gpaHeader.classList.remove("Gpa_premium");
          }
        }
      }
      range(3.5, 4.0);
    },
  };
})();

var appController = (function () {
  var getDomstrings = uIController.getDomstrings();
  var btn = getDomstrings.btn;
  var newGp = getDomstrings.totalGp;
  var unitPassed = getDomstrings.averageGrade;
  var TotalCourseTaken = getDomstrings.courseTaken;

  //Event listener
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    uIController.displayValue();
    uIController.displayVariousGPBoard();

    console.log(unitPassed.textContent);
  });

  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      //1. display value to the UI
      var getDisply = uIController.displayValue();
      //2. clear the field.
      var getId = getDisply.getID();
      console.log(getId);
      //3. delete from calculation
      uIController.displayVariousGPBoard();
      //4. prevent default.
      event.preventDefault();
    }
  });

  // Delete list
  var list = getDomstrings.list;

  list.addEventListener("click", deleteItem);
  function deleteItem(event) {
    var getTotal = claculateGP.getTotalStores();
    var pushTotal = getTotal.pushedTotal;
    var getID = getTotal.totalId;
    var units = getTotal.passedGrade;
    var TotalUnits = getTotal.pushedUnit;
    console.log(units, pushTotal);
    var ID = event.target.parentNode.parentNode.id;

    // var totalVal = getSumAll.getTotalValue()
    //console.log(totalVal)
    uIController.displayVariousGPBoard();

    if (ID) {
      var splitId = ID.split("-");
      id = parseInt(splitId[1]);
      // 2.Delete the element from the array
      appController.deleteItem(units, ID, getID, TotalUnits);
      //3. Recalculate the result of the array
      var reCalc = appController.recalcualteSumOfAll(units, TotalUnits);
      var reduceForAl = reCalc.getReduceForAll();
      var TotalTaken = reCalc.getUnitTotal();
      console.log(TotalTaken, reduceForAl);

      appController.updateCalc(
        reduceForAl,
        newGp,
        units,
        unitPassed,
        TotalTaken,
        TotalCourseTaken
      );

      //  4.Also displays various Board
      uIController.displayVariousGPBoard();
    }
    appController.deleteListItem(ID);
  }
  return {
    deleteListItem: function (ID) {
      var el = document.getElementById(ID);
      el.parentNode.removeChild(el);
    },
    deleteItem: function (units, ID, getID, TotalUnits) {
      var splitId = ID.split("-");
      var id = parseInt(splitId[1]);
      console.log(ID);
      var ids = getID.map(function (cur) {
        return cur;
      });

      var index = ids.indexOf(id);

      if (index !== -1) {
        units.splice(index, 1);
        TotalUnits.splice(index, 1);
        console.log(index);
        console.log(units);
        //  } else if (units.length === '2') {
        //      console.log(units.length)
        //     units.splice(index, 1)
        //     TotalUnits.splice(index, 1)
      }
    },
    recalcualteSumOfAll: function (units, TotalUnits) {
      console.log(units);
      console.log(TotalUnits);
      var getCur = units.map(function (cur) {
        return cur;
      });
      var curLength = getCur.length;
      var reduce = getCur.reduce(function (cur, acc) {
        return acc + cur;
      }, 0);
      const TotalUnit = TotalUnits.reduce((cur, acc) => {
        return acc + cur;
      }, 0);
      //   if (units.length === 0) {
      //     newGp.textContent = getTotal = 0
      //     unitPassed.textContent  = 0
      //     TotalCourseTaken.textContent = 0

      //   }

      return {
        getReduceForAll: function () {
          return reduce;
        },
        getUnitTotal: function () {
          return TotalUnit;
        },
      };
    },
    updateCalc: function (
      reduceForAl,
      newGp,
      units,
      unitPassed,
      TotalTaken,
      TotalCourseTaken
    ) {
      newGp.textContent = getTotal =
        parseFloat(reduceForAl / units.length).toFixed(2) + " GP";
      unitPassed.textContent = reduceForAl;
      TotalCourseTaken.textContent = TotalTaken;
      console.log(reduceForAl, TotalTaken);
      if (units < -1) {
        newGp.textContent = getTotal = 0;
      }
    },
  };
})();

// Modules that does the GP calculator.
var claculateGP = (function () {
  var getDomstrings = uIController.getDomstrings();
  var units = getDomstrings.units;
  var grade = getDomstrings.gradeSystem;
  var courseGrade = getDomstrings.grade;

  var totalStores = {
    pushedTotal: [],
    pushedUnit: [],
    sumOfTotalUnit: [],
    totalId: [],
    passedGrade: [],
  };

  return {
    DoCalculations: function () {
      //Calculation done in this method
      var unitsArr = Array.from(units.value);
      var gradeArr = Array.from(grade.value);
      var parsedArr = parseFloat(unitsArr[0]);
      var parsedGradeArr = parseFloat(gradeArr[0]);
      var cGrade = courseGrade.value;
      console.log(totalStores.sumOfTotalUnit);

      console.log(totalStores.pushedTotal);
      console.log(totalStores.passedGrade);
      console.log(totalStores.totalId);

      if (cGrade === "A") {
        cGrade = 4;
      } else if (cGrade === "B") {
        cGrade = 3;
      } else if (cGrade === "C") {
        cGrade = 2;
      } else if (cGrade === "D") {
        cGrade = 1;
      } else {
        cGrade = 0;
      }

      claculateGP.gpFormular(cGrade, parsedArr, parsedGradeArr);
      var reduceAll = claculateGP.reduceAll(
        totalStores.pushedTotal,
        totalStores.pushedUnit,
        totalStores.passedGrade
      );
      console.log(reduceAll);
      var getReduce = reduceAll.getReduce();
      var firstReduce = getReduce.getReduced1;
      var secondReduce = getReduce.getReduced2;
      thirdReduce = getReduce.getReduced3;

      // gpFormular.getformular()
      return {
        getReduceAll: function () {
          return reduceAll;
        },
      };
    },
    //The formular for getting average GP is derived and used.
    gpFormular: function (cGrade, parsedArr, parsedGradeArr) {
      var formular = (cGrade / parsedGradeArr) * parsedArr;
      var cGrade = cGrade;

      //formular =  formular.toFixed(2)
      totalStores.pushedTotal.push(formular);
      totalStores.pushedUnit.push(parsedArr);
      totalStores.passedGrade.push(cGrade);
      console.log(totalStores.pushedUnit);
    },
    reduceAll: function (pushedTotal, pushedUnit, pushedPassed) {
      //The useful arrays ae reduced i.e sum up to a single value.
      var reduced1 = pushedTotal.reduce(function (cur, acc) {
        return acc + cur;
      }, 0);
      var reduced2 = pushedUnit.reduce(function (cur, acc) {
        return acc + cur;
      }, 0);
      var reduced3 = pushedPassed.reduce(function (cur, acc) {
        return cur + acc;
      }, 0);

      console.log(reduced1, reduced2, reduced3);
      document
        .querySelector(".btn_submit")
        .addEventListener(
          "click",
          claculateGP.sumAll(reduced1, reduced2, reduced3)
        );
      document
        .querySelector(".btn_submit")
        .addEventListener("click", function (event) {
          event.preventDefault();
        });

      claculateGP.displayUnits(reduced2, reduced3);
      return {
        getReduce: function () {
          return {
            getReduced1: reduced1,
            getReduced2: reduced2,
            getReduced3: reduced3,
          };
        },
      };
    },
    sumAll: function (reduced1, reduced2, reduced3) {
      //The toral GPA is derived and calculated.
      var gradeSystem = getDomstrings.gradeSystem.value;
      var gradsysArr = Array.from(gradeSystem);
      var parseGrade = parseFloat(gradsysArr[0]);

      var sumOfAll = reduced3 / totalStores.pushedUnit.length;
      var sumFixed = parseFloat(sumOfAll).toFixed(2);
      var overAll = getDomstrings.totalGp;
      var getAll = (overAll.textContent = sumFixed + " GP");
      var splitAll = getAll.split(" ");
      var getValue = splitAll[0];
      totalStores.sumOfTotalUnit.push(splitAll[0]);
      console.log(totalStores.sumOfTotalUnit);
      return {
        getTotalValue: function () {
          return getValue;
        },
      };
    },
    getTotalStores: function () {
      return totalStores;
    },
    displayUnits: function (unitTaken, unitsPassed) {
      //All the units are reduced and display into the UI.
      var unitTakens = getDomstrings.courseTaken;
      var unitsPasseds = getDomstrings.averageGrade;
      unitTakens.textContent = unitTaken;
      unitsPasseds.textContent = unitsPassed;
    },
  };
})();

var init = (function () {
  // Initialization function. These function is called before any other function
  var domElements = uIController.getDomstrings();
  var totalGP = domElements.totalGp;
  totalGP.textContent = 0;
  var averageTotal = domElements.averageGrade;
  averageTotal.textContent = 0;
  var courseTaken = domElements.courseTaken;
  courseTaken.textContent = 0;
})();
