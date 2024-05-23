let currentInput = '';

    function showConverter(type) {
        const converters = document.querySelectorAll('.converter');
        converters.forEach(conv => conv.classList.remove('active'));

        document.getElementById(type).classList.add('active');

        const buttons = document.querySelectorAll('.menu-bar button');
        buttons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('.menu-bar button[onclick="showConverter(\'' + type + '\')"]').classList.add('active');
        clearInput();

    }

    function appendNumber(number) {
        currentInput += number;
        document.querySelector('.converter.active input').value = currentInput;
        updateConversion();
    }

    function clearInput() {
        currentInput = '';
        document.querySelector('.converter.active input').value = '';
        updateConversion();
    }

    function updateConversion() {
        const activeConverter = document.querySelector('.converter.active');
        const inputValue = parseFloat(currentInput) || 0;
        const fromUnit = activeConverter.querySelector('select:nth-of-type(1)').value;
        const toUnit = activeConverter.querySelector('select:nth-of-type(2)').value;

        let result = '';
        if (currentInput) {
            if (activeConverter.id === 'area') {
                result = convertArea(inputValue, fromUnit, toUnit);
            } else if (activeConverter.id === 'length') {
                result = convertLength(inputValue, fromUnit, toUnit);
            } else if (activeConverter.id === 'temperature') {
                result = convertTemperature(inputValue, fromUnit, toUnit);
            } else if (activeConverter.id === 'volume') {
                result = convertVolume(inputValue, fromUnit, toUnit);
            } else if (activeConverter.id === 'mass') {
                result = convertMass(inputValue, fromUnit, toUnit);
            } else if (activeConverter.id === 'time') {
                result = convertTime(inputValue, fromUnit, toUnit);
            }
        }

        activeConverter.querySelector('div').innerText = result;
    }

    function convertArea(value, from, to) {
        const conversionRates = {
            acres: { sqm: 4046.86, sqkm: 0.00404686, sqft: 43560, acres: 1 },
            sqm: { acres: 0.000247105, sqkm: 0.000001, sqft: 10.7639, sqm: 1 },
            sqkm: { acres: 247.105, sqm: 1000000, sqft: 10763910.4, sqkm: 1 },
            sqft: { acres: 0.0000229568, sqm: 0.092903, sqkm: 0.000000092903, sqft: 1 }
        };

        const result = value * conversionRates[from][to];
        return `${result.toFixed(2)} ${to}`;
    }

    function convertLength(value, from, to) {
        const conversionRates = {
            inches: { cm: 2.54, meters: 0.0254, km: 0.0000254, inches: 1 },
            cm: { inches: 0.393701, meters: 0.01, km: 0.00001, cm: 1 },
            meters: { inches: 39.3701, cm: 100, km: 0.001, meters: 1 },
            km: { inches: 39370.1, cm: 100000, meters: 1000, km: 1 }
        };

        const result = value * conversionRates[from][to];
        return `${result.toFixed(2)} ${to}`;
    }

    function convertTemperature(value, from, to) {
        let result = value;
        if (from === 'celsius') {
            if (to === 'fahrenheit') {
                result = (value * 9/5) + 32;
            } else if (to === 'kelvin') {
                result = value + 273.15;
            }
        } else if (from === 'fahrenheit') {
            if (to === 'celsius') {
                result = (value - 32) * 5/9;
            } else if (to === 'kelvin') {
                result = ((value - 32) * 5/9) + 273.15;
            }
        } else if (from === 'kelvin') {
            if (to === 'celsius') {
                result = value - 273.15;
            } else if (to === 'fahrenheit') {
                result = ((value - 273.15) * 9/5) + 32;
            }
        }
        return `${result.toFixed(2)} ${to}`;
    }

    function convertVolume(value, from, to) {
        const conversionRates = {
            liters: { ml: 1000, gallons: 0.264172, liters: 1 },
            ml: { liters: 0.001, gallons: 0.000264172, ml: 1 },
            gallons: { liters: 3.78541, ml: 3785.41, gallons: 1 }
        };

        const result = value * conversionRates[from][to];
        return `${result.toFixed(2)} ${to}`;
    }

    function convertMass(value, from, to) {
        const conversionRates = {
            kg: { grams: 1000, pounds: 2.20462, kg: 1 },
            grams: { kg: 0.001, pounds: 0.00220462, grams: 1 },
            pounds: { kg: 0.453592, grams: 453.592, pounds: 1 }
        };

        const result = value * conversionRates[from][to];
        return `${result.toFixed(2)} ${to}`;
    }

    function convertTime(value, from, to) {
        const conversionRates = {
            seconds: { minutes: 0.0166667, hours: 0.000277778, days: 0.0000115741, weeks: 0.00000165344, seconds: 1 },
            minutes: { seconds: 60, hours: 0.0166667, days: 0.000694444, weeks: 0.0000992063, minutes: 1 },
            hours: { seconds: 3600, minutes: 60, days: 0.0416667, weeks: 0.00595238, hours: 1 },
            days: { seconds: 86400, minutes: 1440, hours: 24, weeks: 0.142857, days: 1 },
            weeks: { seconds: 604800, minutes: 10080, hours: 168, days: 7, weeks: 1 }
        };

        const result = value * conversionRates[from][to];
        return `${result.toFixed(2)} ${to}`;
    }
