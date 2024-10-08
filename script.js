const allPetList = document.getElementById("allPetList");
const loading = document.getElementById("loading");
const dogs = document.getElementById("dogs");
const cats = document.getElementById("cats");
const rabbits = document.getElementById("rabbits");
const birds = document.getElementById("birds");
const rabbitcard = document.getElementById("rabbitcard");
const catagorySection = document.getElementById("catagorySection");
const likePic = document.getElementById("likePic");
const modalDesign = document.getElementById("modalDesign");
const shortByPrice = document.getElementById("shortByPrice");


// common Function
const htmlTag = (
  access,
  pic,
  cost,
  natio,
  name,
  birth,
  gen,
  id,
  details,
  status
) => {
  access.innerHTML += `
    <div class="w-[90%] lg:w-[32.5%] m-auto lg:m-0 border-2 p-5 lg:p-2 rounded-xl  shadow-md ">

    <div class="rounded-xl overflow-hidden">
    <img class="w-full h-full rounded-xl" src="${pic}" alt="">
    </div>
    
    <div class="mt-4">
    <h1 class="font-extrabold text-2xl">${name}</h1>
    <p class="font-semibold mt-3"><i class="fa-solid fa-border-all"></i> Breed: ${
      natio == null ? "Not mentioned" : natio
    }</p>
    <p class="font-semibold mt-1"><i class="fa-regular fa-calendar"></i> Birth: ${
      birth == null ? "Not available" : birth
    }</p>
    <p class="font-semibold mt-1"><i class="fa-solid fa-mercury"></i> Gender: ${
      gen == null ? "Not mentioned" : gen
    }</p>
    <p class="font-semibold mt-1"><i class="fa-solid fa-dollar-sign"></i> Price : ${
      cost == null ? "Not available" : cost + "$"
    }</p>
    </div>


    <div class="divider mb-2"></div>
    <div class="flex justify-center gap-2">
    <button  onclick="likeAddPic(this)" class="btn block text-lg bg-white shadow-sm"><i class="fa-regular fa-thumbs-up"></i>
    </button>
    <button  onclick="adoptModal(this)" class="btn pr-0 pl-0 block text-lg w-[30%] text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white bg-white shadow-sm">Adot</button>
    <button  onclick="my_modal_4.showModal(); modalDes(this,${id});" class="btn pr-0 pl-0 block text-lg w-[30%] text-[#0E7A81] hover:bg-[#0E7A81] hover:text-white bg-white shadow-sm">Details</button>
    
    </div>
    
    </div>


    
    `;
};

// adopt Modal Function
const adoptModal = (access) => {
  document.getElementById("adoptbutton").click();

  access.setAttribute("disabled", "");

  let countdown = 3; // Countdown starting from 3 seconds
  document.getElementById("countdownText").textContent = countdown;

  const countdownInterval = setInterval(() => {
    countdown -= 1;
    document.getElementById("countdownText").textContent = countdown;

    if (countdown === 1) {
      clearInterval(countdownInterval);
      setTimeout(() => {
        document.getElementById("autoClose").click();
        access.innerHTML = "Adopted";
      }, 500);
      
    }
  }, 1000);
};

// details button
const modalDes = async (access, id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );
  const data = await response.json();

  const petdata = data.petData;

  const {
    breed,
    date_of_birth,
    price,
    image,
    gender,
    pet_details,
    pet_name,
    vaccinated_status,
  } = petdata;

  modalDesign.innerHTML = `<div class="w-[100%] m-auto ">
                
           
            <img class="w-full lg:h-auto rounded-xl" src="${image}" alt="">
 </div>
            <div>
                <h1 class="text-3xl font-bold pt-5 pb-3">${pet_name}</h1>

                <div class="flex flex-col lg:flex-row lg:w-[60%] justify-between">
                    <div>

                        <p class="font-semibold mt-1"><i class="fa-solid fa-border-all"></i> Breed: ${
                          breed == null ? "Not mentioned" : breed
                        }</p>

                        <p class="font-semibold mt-1"><i class="fa-solid fa-mercury"></i> Gender: ${
                          gender == null ? "Not mentioned" : gender
                        }</p>

                        <p class="font-semibold mt-1"><i class="fa-solid fa-mercury"></i> Vaccinated status: ${
                          vaccinated_status == null
                            ? "Not mentioned"
                            : vaccinated_status
                        }</p>
                    </div>


                    <div>

                        <p class="font-semibold mt-1"><i class="fa-regular fa-calendar"></i> Birth: ${
                          date_of_birth == null
                            ? "Not available"
                            : date_of_birth
                        }</p>

                        <p class="font-semibold mt-1"><i class="fa-solid fa-dollar-sign"></i> Price : ${
                          price == null ? "Not available" : price + "$"
                        }</p>
                    </div>


                </div>


                <div class="divider my-1"></div>

                <div>
                    <h2 class="text-xl font-bold">Details Information</h2>
                    <p class="py-3">${pet_details}</p>
                </div>


            </div>
            
            <div class="modal-action mt-0   justify-center">
                <form method="dialog">
                    <button class="btn text-lg text-[#0E7A81] bg-[#0e798118] px-28 lg:px-64 border-[#0E7A81]">Cancel</button>
                </form>
    
    
            </div>`;
};

// like button
const likeAddPic = (access) => {
  const pic = access.parentElement.parentElement.children[0].innerHTML;

  const div = document.createElement("div");
  div.classList.add("w-[47%]", "rounded-xl", "p-2", "lg:p-1", "border");
  div.innerHTML = pic;

  likePic.appendChild(div);
};

// create catagory button
const catagoryFetch = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();

  const catagoryobj = data.categories;

  catagoryobj.forEach((index) => {
    const { category, category_icon } = index;
    
    catagorySection.innerHTML += `
      
        <button  id="btn${category}" onclick="fetch${category}(this)"
                    class="bg-white shadow-md btn h-auto   w-[23%] border  py-2   font-extrabold text-sm  block flex justify-center gap-1 items-center">


                     <img
                        class=" w-[25%] " src="${category_icon}"
                        alt="">
                        <p class="lg:text-xl">${category}</p>
                  
                   
                   
                   </button>
                        
        `;
  });
};

catagoryFetch();

// sort Funtion
shortByPrice.addEventListener("click", async () => {
  const allpet = async () => {
    allPetList.innerHTML = ``;
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const data = await response.json();
    const mainArry = data.pets;
    mainArry.sort((a, b) => b.price - a.price);

    mainArry.forEach((index) => {
      const {
        image,
        price,
        breed,
        pet_name,
        date_of_birth,
        gender,
        petId,
        pet_details,
        vaccinated_status,
      } = index;
      htmlTag(
        allPetList,
        image,
        price,
        breed,
        pet_name,
        date_of_birth,
        gender,
        petId,
        pet_details,
        vaccinated_status
      );
    });
  };

  const alldog = async () => {
    dogcard.innerHTML = ``;
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/category/dog"
    );
    const data = await response.json();
    const mainArry = data.data;
    mainArry.sort((a, b) => b.price - a.price);

    mainArry.forEach((index) => {
      const {
        image,
        price,
        breed,
        pet_name,
        date_of_birth,
        gender,
        petId,
        pet_details,
        vaccinated_status,
      } = index;
      htmlTag(
        dogcard,
        image,
        price,
        breed,
        pet_name,
        date_of_birth,
        gender,
        petId,
        pet_details,
        vaccinated_status
      );
    });
  };

  const allcat = async () => {
    catcard.innerHTML = ``;
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/category/cat"
    );
    const data = await response.json();
    const mainArry = data.data;
    mainArry.sort((a, b) => b.price - a.price);

    mainArry.forEach((index) => {
      const {
        image,
        price,
        breed,
        pet_name,
        date_of_birth,
        gender,
        petId,
        pet_details,
        vaccinated_status,
      } = index;
      htmlTag(
        catcard,
        image,
        price,
        breed,
        pet_name,
        date_of_birth,
        gender,
        petId,
        pet_details,
        vaccinated_status
      );
    });
  };

  const allrabbit = async () => {
    rabbitcard.innerHTML = ``;
    const response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/category/rabbit"
    );
    const data = await response.json();
    const mainArry = data.data;
    mainArry.sort((a, b) => b.price - a.price);

    mainArry.forEach((index) => {
      const {
        image,
        price,
        breed,
        pet_name,
        date_of_birth,
        gender,
        petId,
        pet_details,
        vaccinated_status,
      } = index;
      htmlTag(
        rabbitcard,
        image,
        price,
        breed,
        pet_name,
        date_of_birth,
        gender,
        petId,
        pet_details,
        vaccinated_status
      );
    });
  };

  if (allPetList.classList.contains("hidden") === false) {
    allpet();
  } else if (dogs.classList.contains("hidden") === false) {
    alldog();
  } else if (cats.classList.contains("hidden") === false) {
    allcat();
  } else if (rabbits.classList.contains("hidden") === false) {
    allrabbit();
  }
});

// all pet fetch
const allPet = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await response.json();

  const mainArry = data.pets;

  document
    .getElementById("borderFact")
    .classList.remove("border", "py-5", "border", "rounded-xl");
  setTimeout(() => {
    loading.classList.add("hidden");
    document
      .getElementById("borderFact")
      .classList.add("border", "py-5", "border", "rounded-xl");

    petDetails(mainArry);
  }, 2000);

  const petDetails = (param) => {
    allPetList.innerHTML = "";
    param.forEach((index) => {
      const {
        image,
        price,
        breed,
        pet_name,
        date_of_birth,
        gender,
        petId,
        pet_details,
        vaccinated_status,
      } = index;

      htmlTag(
        allPetList,
        image,
        price,
        breed,
        pet_name,
        date_of_birth,
        gender,
        petId,
        pet_details,
        vaccinated_status
      );
    });
  };
};
allPet(); //call funtion

// dogs fetch
const fetchDog = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/category/dog"
  );
  const data = await response.json();
  // rounded-full border-[#0E7A81] bg-[#0e79812f]
  document
    .getElementById("btnDog")
    .classList.add("rounded-full", "border-[#0E7A81]", "bg-[#0e79812f]");
  document
    .getElementById("btnCat")
    .classList.remove("rounded-full", "border-[#0E7A81]", "bg-[#0e79812f]");
  document
    .getElementById("btnRabbit")
    .classList.remove("rounded-full", "border-[#0E7A81]", "bg-[#0e79812f]");
  document
    .getElementById("btnBird")
    .classList.remove("rounded-full", "border-[#0E7A81]", "bg-[#0e79812f]");
  document.getElementById("btnDog").classList.remove("bg-white");

  allPetList.classList.add("hidden");
  cats.classList.add("hidden");
  rabbits.classList.add("hidden");
  dogs.classList.remove("hidden");
  birds.classList.add("hidden");
  document.getElementById("loadingdog").classList.remove("hidden");
  dogcard.classList.add("hidden");
  document
    .getElementById("borderFact")
    .classList.remove("border", "py-5", "border", "rounded-xl");

  setTimeout(() => {
    document.getElementById("loadingdog").classList.add("hidden");
    dogcard.classList.remove("hidden");
    document
      .getElementById("borderFact")
      .classList.add("border", "py-5", "border", "rounded-xl");
    dogDetails(data.data);
  }, 2000);

  const dogDetails = (param) => {
    dogcard.innerHTML = "";
    param.forEach((index) => {
      const {
        image,
        price,
        breed,
        pet_name,
        date_of_birth,
        gender,
        petId,
        pet_details,
        vaccinated_status,
      } = index;

      htmlTag(
        dogcard,
        image,
        price,
        breed,
        pet_name,
        date_of_birth,
        gender,
        petId,
        pet_details,
        vaccinated_status
      );
    });
  };
};

// cats fetch
const fetchCat = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/category/cat"
  );
  const data = await response.json();

  document
    .getElementById("btnDog")
    .classList.remove("rounded-full", "border-[#0E7A81]", "bg-[#0e79812f]");
  document
    .getElementById("btnRabbit")
    .classList.remove("rounded-full", "border-[#0E7A81]", "bg-[#0e79812f]");
  document
    .getElementById("btnBird")
    .classList.remove("rounded-full", "border-[#0E7A81]", "bg-[#0e79812f]");
  document
    .getElementById("btnCat")
    .classList.add("rounded-full", "border-[#0E7A81]", "bg-[#0e79812f]");
  document.getElementById("btnCat").classList.remove("bg-white");

  allPetList.classList.add("hidden");
  cats.classList.remove("hidden");
  rabbits.classList.add("hidden");
  dogs.classList.add("hidden");
  birds.classList.add("hidden");
  document.getElementById("loadingcat").classList.remove("hidden");
  catcard.classList.add("hidden");
  document
    .getElementById("borderFact")
    .classList.remove("border", "py-5", "border", "rounded-xl");

  setTimeout(() => {
    document.getElementById("loadingcat").classList.add("hidden");
    catcard.classList.remove("hidden");
    document
      .getElementById("borderFact")
      .classList.add("border", "py-5", "border", "rounded-xl");
    catDetails(data.data);
  }, 2000);

  const catDetails = (param) => {
    catcard.innerHTML = "";
    param.forEach((index) => {
      const {
        image,
        price,
        breed,
        pet_name,
        date_of_birth,
        gender,
        petId,
        pet_details,
        vaccinated_status,
      } = index;

      htmlTag(
        catcard,
        image,
        price,
        breed,
        pet_name,
        date_of_birth,
        gender,
        petId,
        pet_details,
        vaccinated_status
      );
    });
  };
};

// rabbits fetch
const fetchRabbit = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/category/rabbit"
  );
  const data = await response.json();

  document
    .getElementById("btnDog")
    .classList.remove("rounded-full", "border-[#0E7A81]", "bg-[#0e79812f]");
  document
    .getElementById("btnCat")
    .classList.remove("rounded-full", "border-[#0E7A81]", "bg-[#0e79812f]");
  document
    .getElementById("btnBird")
    .classList.remove("rounded-full", "border-[#0E7A81]", "bg-[#0e79812f]");
  document
    .getElementById("btnRabbit")
    .classList.add("rounded-full", "border-[#0E7A81]", "bg-[#0e79812f]");
  document.getElementById("btnRabbit").classList.remove("bg-white");

  allPetList.classList.add("hidden");
  cats.classList.add("hidden");
  rabbits.classList.remove("hidden");
  dogs.classList.add("hidden");
  birds.classList.add("hidden");
  document.getElementById("loadingrabbit").classList.remove("hidden");
  rabbitcard.classList.add("hidden");
  document
    .getElementById("borderFact")
    .classList.remove("border", "py-5", "border", "rounded-xl");

  setTimeout(() => {
    document.getElementById("loadingrabbit").classList.add("hidden");
    rabbitcard.classList.remove("hidden");
    document
      .getElementById("borderFact")
      .classList.add("border", "py-5", "border", "rounded-xl");
    rabbitDetails(data.data);
  }, 2000);

  const rabbitDetails = (param) => {
    rabbitcard.innerHTML = "";
    param.forEach((index) => {
      const {
        image,
        price,
        breed,
        pet_name,
        date_of_birth,
        gender,
        petId,
        pet_details,
        vaccinated_status,
      } = index;

      htmlTag(
        rabbitcard,
        image,
        price,
        breed,
        pet_name,
        date_of_birth,
        gender,
        petId,
        pet_details,
        vaccinated_status
      );
    });
  };
};

// bird Fetch
const fetchBird = () => {
  document
    .getElementById("btnDog")
    .classList.remove("rounded-full", "border-[#0E7A81]", "bg-[#0e79812f]");
  document
    .getElementById("btnCat")
    .classList.remove("rounded-full", "border-[#0E7A81]", "bg-[#0e79812f]");
  document
    .getElementById("btnRabbit")
    .classList.remove("rounded-full", "border-[#0E7A81]", "bg-[#0e79812f]");
  document
    .getElementById("btnBird")
    .classList.add("rounded-full", "border-[#0E7A81]", "bg-[#0e79812f]");
  document.getElementById("btnBird").classList.remove("bg-white");
  document.getElementById("borderFact").classList.remove("border");

  allPetList.classList.add("hidden");
  cats.classList.add("hidden");
  rabbits.classList.add("hidden");
  dogs.classList.add("hidden");
  birds.classList.remove("hidden");
  loadingbirds.classList.remove("hidden");
  document.getElementById("birdPart").classList.add("hidden");
  setTimeout(() => {
    loadingbirds.classList.add("hidden");
    document.getElementById("birdPart").classList.remove("hidden");
  }, 2000);
};
