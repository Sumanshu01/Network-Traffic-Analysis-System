# Network Traffic Analysis System

A web-based network packet capture and analysis tool with Wireshark-style filtering and anomaly detection capabilities.

## Features

- **Live Packet Capture**: Simulate real-time packet capture with random IP addresses and protocols
- **Advanced Filtering**: Filter packets by protocol (TCP, HTTP, HTTPS, UDP), anomaly status, or source IP
- **Anomaly Detection**: Automatically detect and flag suspicious network traffic
- **DDoS Simulation**: Toggle DDoS attack mode to simulate volumetric attacks
- **Port Scan Detection**: Detect and highlight port scan anomalies
- **Real-time Visualization**: 
  - Live packet count line chart
  - Packet status distribution bar chart
- **Export Functionality**: Export captured traffic data in PCAP format
- **Modern UI**: Dark-themed dashboard with animated background and live status indicator

## Installation

1. Clone or download this repository
2. No dependencies required - uses CDN for Chart.js library
3. Open `index.html` in any modern web browser

## Usage

### Capturing Packets
- Click **"Capture Packet"** to generate and capture a single packet
- Packets will automatically appear in the live table if they match your filter criteria

### Filtering Traffic
Use the filter input box with the following syntax:
- `tcp` - Filter by protocol (http, https, udp, tcp)
- `anomaly` - Show only anomalous packets
- `ip.src == 192.168.1.1` - Filter by source IP address
- Leave empty to show all packets

### Attack Simulation Modes
- **DDoS Mode**: Click to toggle DDoS attack simulation. Active DDoS packets are marked as anomalies
- **Port Scan**: Click to toggle port scan simulation. Port scan attempts are flagged as anomalies

### Data Export
- Click **"Export PCAP"** to download captured traffic data in PCAP format for external analysis

### Live Indicator
The green live indicator (● LIVE) shows the system is actively monitoring traffic

## Dashboard Components

| Component | Description |
|-----------|-------------|
| **Packet Table** | Real-time table showing captured packets with timestamp, source IP, destination IP, protocol, and status |
| **Packet Rate Chart** | Line graph displaying cumulative packet count over time |
| **Anomaly Distribution** | Bar chart showing the ratio of safe packets to detected anomalies |

## Technical Details

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Charting**: Chart.js library (CDN)
- **Protocols Supported**: HTTP, HTTPS, TCP, UDP
- **Styling**: Modern dark theme with animated grid background

## Files

- `index.html` - Main HTML structure and layout
- `script.js` - Core JavaScript logic for packet simulation, filtering, and visualization
- `style.css` - Styling and animations

## Features in Detail

### Packet Generation
The system generates simulated packets with:
- Random source and destination IP addresses
- Random protocol selection
- Timestamp-based logging
- Automatic anomaly detection (default 20% anomaly rate, 100% in attack modes)

### Filtering Engine
Intelligent multi-criteria filtering system:
- Protocol matching (case-insensitive)
- Anomaly status filtering
- IP address range filtering with `ip.src ==` syntax
- Real-time filter updates

### Visualization
- **Packet Count**: Tracks total packets captured in real-time
- **Anomaly Detection Rate**: Visual representation of safe vs. anomalous traffic
- **Attack Indicators**: Special labels for DDoS and port scan attacks

## Use Cases

- **Educational**: Learn about network packet analysis and anomaly detection
- **Testing**: Simulate network attacks and anomalies for training purposes
- **Demonstration**: Show network security concepts in action
- **Prototyping**: Foundation for more advanced network monitoring tools

## Future Enhancements

- Packet payload inspection
- Protocol-specific filtering rules
- Geographic IP mapping
- Machine learning-based anomaly detection
- Multi-protocol support expansion
- Packet capture from actual network interfaces

## Developed By

Sumanshu Jindal

---

**Note**: This is a simulation tool for educational purposes. It does not capture actual network traffic.
