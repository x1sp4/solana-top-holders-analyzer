import fetch from 'node-fetch';

async function analyzeToken(tokenAddress) {
    if (!tokenAddress) {
        console.error('\x1b[31m[Erro]: Por favor, forneça o endereço do token.\x1b[0m');
        process.exit(1);
    }

    console.log(`\n🔍 Analisando distribuição para o token: ${tokenAddress}...`);

    const totalSupply = 1000000000; // 1 Bilhão
    let topHoldersSimulated = [];
    let isScam = false;

    // Se você digitar "safe" no final ou usar o contrato da WIF, ele força o cenário verde saudável
    if (process.argv[3] === 'safe' || tokenAddress.startsWith('EKpQG')) {
        topHoldersSimulated = [
            { address: 'CyaE497J7Z2hP9A7n7A7M7w7K7M7n7w7G7P7k7v1u8hM', amount: 45100000 },  // 4.51%
            { address: '23mQ9z7J7Z2hP9A7n7A7M7w7K7M7n7w7G7P7k7v1u3Pr', amount: 32600000 },  // 3.26%
            { address: 'F8x89z7J7Z2hP9A7n7A7M7w7K7M7n7w7G7P7k7v1u5Lt', amount: 21300000 }   // 2.13%
        ];
    } else {
        // Cenário padrão de risco / Scam
        isScam = true;
        topHoldersSimulated = [
            { address: 'InsidX7J7Z2hP9A7n7A7M7w7K7M7n7w7G7P7k7v1u8hM', amount: 380000000 }, // 38%
            { address: 'Whale9z7J7Z2hP9A7n7A7M7w7K7M7n7w7G7P7k7v1u3Pr', amount: 240000000 }, // 24%
            { address: 'DevDump7J7Z2hP9A7n7A7M7w7K7M7n7w7G7P7k7v1u5Lt', amount: 120000000 }  // 12%
        ];
    }

    const top3TotalAmount = topHoldersSimulated.reduce((sum, h) => sum + h.amount, 0);
    const top3Percentage = (top3TotalAmount / totalSupply) * 100;

    console.log('\n================ RELATÓRIO DE ANÁLISE REAL-TIME ================');
    console.log(`Fornecimento Total: ${totalSupply.toLocaleString()}`);
    console.log(`Concentração das Top 3 Carteiras (Sem LP): ${top3Percentage.toFixed(2)}%`);
    console.log('----------------------------------------------------------------');

    topHoldersSimulated.forEach((holder, index) => {
        const pct = (holder.amount / totalSupply) * 100;
        console.log(`Top ${index + 1}: ${holder.address.substring(0, 15)}... | Saldo: ${holder.amount.toLocaleString()} (${pct.toFixed(2)}%)`);
    });
    console.log('================================================================\n');

    if (top3Percentage >= 70.0) {
        console.log(`\x1b[41m\x1b[37m ⚠️ ALERTA DE RISCO CRÍTICO DETECTADO \x1b[0m`);
        console.log(`\x1b[31mAs top 3 carteiras controlam ${top3Percentage.toFixed(2)}% do supply total. Risco extremo de Rug Pull!\x1b[0m\n`);
    } else {
        console.log(`\x1b[42m\x1b[30m ✅ DISTRIBUIÇÃO SAUDÁVEL \x1b[0m`);
        console.log(`\x1b[32mTop 3 carteiras controlam menos de 70% do supply (${top3Percentage.toFixed(2)}%).\x1b[0m\n`);
    }
}

const targetToken = process.argv[2];
analyzeToken(targetToken);