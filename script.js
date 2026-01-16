const table = document.getElementById("packetTable");
const filterInput = document.getElementById("filterInput");
const liveIndicator = document.getElementById("liveIndicator");

let packetCount = 0;
let anomalyCount = 0;
let captureInterval = null;
let ddosMode = false;
let portScanMode = false;

const protocols = ["HTTP", "HTTPS", "TCP", "UDP"];
let capturedPackets = [];

/* ---------- Utility ---------- */
function rand() {
    return Math.floor(Math.random() * 255);
}

function randomIP() {
    return `${rand()}.${rand()}.${rand()}.${rand()}`;
}

/* ---------- Charts ---------- */
const packetChart = new Chart(document.getElementById("packetChart"), {
    type: "line",
    data: {
        labels: [],
        datasets: [{
            label: "Packets Captured",
            data: [],
            borderWidth: 2
        }]
    }
});

const anomalyChart = new Chart(document.getElementById("anomalyChart"), {
    type: "bar",
    data: {
        labels: ["Safe", "Anomaly"],
        datasets: [{
            label: "Packet Status",
            data: [0, 0]
        }]
    }
});

/* ---------- Filtering ---------- */
function applyFilter(packet) {
    const filter = filterInput.value.toLowerCase().trim();

    if (!filter) return true;
    if (filter === "anomaly") return packet.status === "Anomaly";
    if (filter === packet.protocol.toLowerCase()) return true;

    if (filter.startsWith("ip.src")) {
        const value = filter.split("==")[1]?.trim();
        return value && packet.src.includes(value);
    }
    return false;
}

/* ---------- Packet Generation ---------- */
function generatePacket() {
    const protocol = portScanMode ? "TCP" : protocols[Math.floor(Math.random() * protocols.length)];

    const packet = {
        time: new Date().toLocaleTimeString(),
        src: randomIP(),
        dst: randomIP(),
        protocol: protocol,
        status: (ddosMode || portScanMode || Math.random() > 0.8) ? "Anomaly" : "Safe"
    };

    if (!applyFilter(packet)) return;

    capturedPackets.push(packet);

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${packet.time}</td>
        <td>${packet.src}</td>
        <td>${packet.dst}</td>
        <td>${packet.protocol}</td>
        <td class="${packet.status === "Safe" ? "safe" : "anomaly"}">
            ${packet.status}${ddosMode ? " (DDoS)" : portScanMode ? " (Port Scan)" : ""}
        </td>
    `;
    table.prepend(row);

    packetCount++;
    if (packet.status === "Anomaly") anomalyCount++;

    packetChart.data.labels.push(packetCount);
    packetChart.data.datasets[0].data.push(packetCount);
    packetChart.update();

    anomalyChart.data.datasets[0].data = [
        packetCount - anomalyCount,
        anomalyCount
    ];
    anomalyChart.update();
}

/* ---------- Attack Modes ---------- */
function toggleDDoS() {
    ddosMode = !ddosMode;
    portScanMode = false;
    toggleAutoCapture(ddosMode ? 100 : null);
}

function togglePortScan() {
    portScanMode = !portScanMode;
    ddosMode = false;
    toggleAutoCapture(portScanMode ? 300 : null);
}

function toggleAutoCapture(speed) {
    if (captureInterval) {
        clearInterval(captureInterval);
        captureInterval = null;
        liveIndicator.style.visibility = "hidden";
        return;
    }
    if (!speed) return;

    liveIndicator.style.visibility = "visible";
    captureInterval = setInterval(generatePacket, speed);
}

/* ---------- PCAP Export ---------- */
function exportPCAP() {
    if (capturedPackets.length === 0) {
        alert("No packets to export");
        return;
    }

    let data = "Time,Source IP,Destination IP,Protocol,Status\n";
    capturedPackets.forEach(pkt => {
        data += `${pkt.time},${pkt.src},${pkt.dst},${pkt.protocol},${pkt.status}\n`;
    });

    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "network_capture.pcap";
    a.click();

    URL.revokeObjectURL(url);
}
const particleContainer = document.getElementById("particles");

for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "vw";
    p.style.animationDuration = (10 + Math.random() * 20) + "s";
    p.style.animationDelay = Math.random() * 10 + "s";
    particleContainer.appendChild(p);
}
