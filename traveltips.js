// Näpunäidete andmestruktuur
const tipsData = {
    'Reisi planeerimine': [
        'Alusta reisi planeerimist vähemalt 3 kuud ette',
        'Tee kindlaks oma eelarve ja järgi seda',
        'Uuri sihtkoha kliimat ja vali sobiv reisiaeg',
        'Broneeri majutus ja lennupiletid võimalikult vara',
        'Tee kindlaks peamised vaatamisväärsused'
    ],
    'Lennud': [
        'Osta lennupiletid 2-3 kuud ette',
        'Vali öised lennud, need on tavaliselt odavamad',
        'Kontrolli pagasi nõudeid',
        'Saabu lennujaama vähemalt 2 tundi enne lendu',
        'Tee kindlaks lennujaama transpordivõimalused'
    ],
    'Eelarve ja raha': [
        'Tee kindlaks igapäevane kulude eelarve',
        'Vaheta valuuta enne reisi',
        'Kasuta krediitkaarti, millel on väike vahetustasu',
        'Hoia raha erinevates kohtades',
        'Jälgi valuutakursse'
    ],
    'Turvalisus': [
        'Hoia pass ja väärtasjad hotellisafes',
        'Tee kindlaks ohutud piirkonnad',
        'Jälgi kohalikke tavasid ja seadusi',
        'Hoia alati kaasas kohaliku keele fraasiraamat',
        'Tee kindlaks hädaabitelefoninumbrid'
    ],
    'Pakkimine': [
        'Tee pakkimisnimekiri',
        'Pakki vastavalt kliimale',
        'Ära unusta olulisi dokumente',
        'Võta kaasa esmaabikomplekt',
        'Jäta ruumi suveniiridele'
    ]
};

// Hangib DOM elemendid
const tipsContainer = document.querySelector('.tips-container');
const tipsDisplay = document.querySelector('.tips');

// Lisab klõpsamise käitlejad näpunäidetele
tipsContainer.addEventListener('click', (e) => {
    const tip = e.target.closest('.tip');
    if (!tip) return;

    // Eemaldab aktiivne klass kõigilt näpunäidetelt
    document.querySelectorAll('.tip').forEach(t => t.classList.remove('active'));
    
    // Lisab aktiivne klass klikitud näpunäitele
    tip.classList.add('active');

    // Hangib näpunäite pealkiri
    const tipTitle = tip.querySelector('p').textContent;
    
    // Kuvab näpunäiteid
    displayTips(tipTitle);
});

// Funktsioon näpunäidete kuvamiseks
function displayTips(tipTitle) {
    const tips = tipsData[tipTitle];
    if (!tips) return;

    // Tühjendab eelnevad näpunäited
    tipsDisplay.innerHTML = '';

    // Loob näpunäidete loend
    const tipsList = document.createElement('ul');
    tipsList.className = 'tips-list';

    // Lisab iga näpunäide loendisse
    tips.forEach(tip => {
        const tipItem = document.createElement('li');
        tipItem.className = 'tip-item';
        tipItem.textContent = tip;
        tipsList.appendChild(tipItem);
    });

    // Lisab pealkiri
    const title = document.createElement('h2');
    title.className = 'tips-title';
    title.textContent = tipTitle;
    tipsDisplay.appendChild(title);
    tipsDisplay.appendChild(tipsList);
}

// Nupule klõpsates kerib näpunäidete jaotise juurde
document.querySelector('.btn').addEventListener('click', () => {
    document.querySelector('#tips-section').scrollIntoView({
      behavior: 'smooth'
    });
});
