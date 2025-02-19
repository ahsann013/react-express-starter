import si from 'systeminformation';
import { WebSocketServer } from 'ws';

let wss;

class SystemController {
    static initializeWebSocket(server) {
        wss = new WebSocketServer({ server });
        
        wss.on('connection', (ws) => {
            console.log('New WebSocket connection');
            
            // Send initial data
            this.sendSystemInfo(ws);
            
            // Set up interval to send updates
            const interval = setInterval(() => {
                if (ws.readyState === ws.OPEN) {
                    this.sendSystemInfo(ws);
                }
            }, 1000);
            
            ws.on('close', () => {
                clearInterval(interval);
                console.log('Client disconnected');
            });
        });
    }

    static async sendSystemInfo(ws) {
        try {
            const [cpuData, memData, diskData, osData] = await Promise.all([
                si.currentLoad(),
                si.mem(),
                si.fsSize(),
                si.osInfo(),
            ]);

            const cpuInfo = await si.cpu();

            const systemInfo = {
                cpu: {
                    usage: Math.round(cpuData.currentLoad),
                    model: cpuInfo.manufacturer + ' ' + cpuInfo.brand,
                },
                memory: {
                    total: Math.round(memData.total / 1024 / 1024 / 1024),
                    used: Math.round(memData.used / 1024 / 1024 / 1024),
                    free: Math.round(memData.free / 1024 / 1024 / 1024),
                },
                disk: {
                    total: Math.round(diskData[0].size / 1024 / 1024 / 1024),
                    used: Math.round(diskData[0].used / 1024 / 1024 / 1024),
                    free: Math.round(diskData[0].available / 1024 / 1024 / 1024),
                },
                os: {
                    platform: osData.platform,
                    hostname: osData.hostname,
                    uptime: Math.round(osData.uptime / 3600),
                },
            };

            ws.send(JSON.stringify(systemInfo));
        } catch (error) {
            console.error('Error fetching system information:', error);
            ws.send(JSON.stringify({ error: 'Failed to fetch system information' }));
        }
    }

    // Keep the existing HTTP endpoint for fallback
    static async systemInfo(req, res) {
        try {
            const [cpuData, memData, diskData, osData] = await Promise.all([
                si.currentLoad(),
                si.mem(),
                si.fsSize(),
                si.osInfo(),
            ]);

            const cpuInfo = await si.cpu();

            const systemInfo = {
                cpu: {
                    usage: Math.round(cpuData.currentLoad),
                    model: cpuInfo.manufacturer + ' ' + cpuInfo.brand,
                },
                memory: {
                    total: Math.round(memData.total / 1024 / 1024 / 1024),
                    used: Math.round(memData.used / 1024 / 1024 / 1024),
                    free: Math.round(memData.free / 1024 / 1024 / 1024),
                },
                disk: {
                    total: Math.round(diskData[0].size / 1024 / 1024 / 1024),
                    used: Math.round(diskData[0].used / 1024 / 1024 / 1024),
                    free: Math.round(diskData[0].available / 1024 / 1024 / 1024),
                },
                os: {
                    platform: osData.platform,
                    hostname: osData.hostname,
                    uptime: Math.round(osData.uptime / 3600),
                },
            };

            res.json(systemInfo);
        } catch (error) {
            console.error('Error fetching system information:', error);
            res.status(500).json({ error: 'Failed to fetch system information' });
        }
    }
}

export default SystemController;