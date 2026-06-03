const details = {
    bins: {
      icon: '🗑️',
      title: 'Full Bin Detection',
      sub: 'Sensor Fusion · Threshold-Based Algorithm',
      text: `
        <p>The system applies a <strong>threshold-based fullness detection algorithm</strong> that combines data from two complementary sensors to minimize false positives and achieve highly accurate full-bin identification.</p>
        <p>The <strong>HC-SR04 ultrasonic sensor</strong> measures the distance between the sensor and the waste surface using time-of-flight calculations. Meanwhile, the <strong>load cell</strong> measures accumulated waste weight to cross-validate distance readings.</p>
        <p>Raw load cell signals pass through the <strong>HX711 amplifier</strong>, which converts low-level analog outputs into high-resolution digital values. A <strong>Wheatstone bridge</strong> configuration further enhances sensitivity by detecting tiny resistance changes in the strain gauges.</p>
        <div class="detail-chips">
          <span class="chip">HC-SR04</span>
          <span class="chip">Load Cell</span>
          <span class="chip">HX711</span>
          <span class="chip">Wheatstone Bridge</span>
          <span class="chip">ESP32</span>
        </div>
      `,
      specs: [
        { e: '📏', label: 'Distance Measurement', val: 'Time-of-flight via HC-SR04 ultrasonic sensor' },
        { e: '⚖️', label: 'Weight Measurement', val: 'Load cell with HX711 ADC amplifier' },
        { e: '🔁', label: 'Fusion Strategy', val: 'Dual threshold comparison to reduce false positives' },
        { e: '📡', label: 'Data Transmission', val: 'ESP32 publishes bin status via MQTT over Wi-Fi' },
      ]
    },
    localization: {
      icon: '📡',
      title: 'Localization',
      sub: 'SLAM · AMCL · LiDAR · ROS Noetic',
      text: `
  <p>The robot uses <strong>ROS Noetic</strong>, <strong>LiDAR data</strong>, odometry, and TF transformations to understand its position inside the mapped environment.</p>
  <p>A 2D occupancy map is generated and visualized in <strong>RViz</strong>, while localization allows the robot to continuously estimate its pose during navigation.</p>
  <p>This stage forms the spatial foundation of the system, enabling the robot to move toward selected bin locations reliably.</p>
        <div class="detail-chips">
          <span class="chip">ROS Noetic</span>
          <span class="chip">SLAM Toolbox</span>
          <span class="chip">AMCL</span>
          <span class="chip">LiDAR</span>
          <span class="chip">RViz</span>
        </div>
      `,
      specs: [
        { e: '🗺️', label: 'Map Type', val: '2D occupancy grid generated via LiDAR scan-matching' },
        { e: '📍', label: 'Localization', val: 'AMCL with particle filter using LiDAR + odometry fusion' },
        { e: '👁️', label: 'Visualization', val: 'RViz for live map, sensor overlay, and pose display' },
        { e: '🔄', label: 'TF Transforms', val: 'Full TF tree for robot base, sensors, and map frames' },
      ]
    },
    navigation: {
      icon: '🤖',
      title: 'Autonomous Movement',
      sub: 'move_base · Global & Local Planners · Obstacle Avoidance',
      text: `
  <p>Autonomous navigation is implemented using the <strong>ROS move_base</strong> framework, which connects global path planning, local motion control, and obstacle avoidance.</p>
  <p>The robot receives target bin coordinates as navigation goals and follows collision-free paths using costmaps generated from the map and LiDAR sensor data.</p>
  <p>Local planning and recovery behaviors allow the robot to react to nearby obstacles, narrow passages, and navigation failures during movement.</p>
        <div class="detail-chips">
          <span class="chip">move_base</span>
          <span class="chip">Global Planner</span>
          <span class="chip">Local Costmap</span>
          <span class="chip">Obstacle Avoidance</span>
        </div>
      `,
      specs: [
        { e: '🌐', label: 'Global Planning', val: 'A* algorithm for full-path generation on occupancy grid' },
        { e: '🏃', label: 'Local Planning', val: 'DWA local planner with real-time velocity commands' },
        { e: '⚠️', label: 'Obstacle Avoidance', val: 'LiDAR-based dynamic costmap updated at runtime' },
        { e: '🎯', label: 'Goal Execution', val: 'move_base action server with recovery behaviors' },
      ]
    },
    path: {
      icon: '🗺️',
      title: 'Optimal Shortest Path',
      sub: 'Node-Based Routing · Cost Matrix · Dynamic Re-routing',
      text: `
        <p>Instead of following a fixed route, the system uses a <strong>node-based route optimization method</strong> for alarm handling. Incoming MQTT alarm messages from full bins are matched to predefined service nodes on the campus map.</p>
        <p>A <strong>travel cost matrix</strong> is constructed between all alerted nodes based on shortest-path searches over the node graph. This matrix is then used to determine the most efficient visiting order when <strong>multiple bins request service simultaneously</strong>.</p>
        <p>The system is also <strong>dynamically adaptive</strong>: if a new alarm arrives mid-route, the path is recalculated on-the-fly to include the new target without interrupting the current mission unnecessarily.</p>
        <div class="detail-chips">
          <span class="chip">A* Algorithm</span>
          <span class="chip">Cost Matrix</span>
          <span class="chip">MQTT Alarms</span>
          <span class="chip">Dynamic Re-routing</span>
        </div>
      `,
      specs: [
        { e: '🔢', label: 'Algorithm', val: 'A* shortest path over a predefined campus node graph' },
        { e: '📊', label: 'Cost Matrix', val: 'Pairwise travel costs computed for all active alarm nodes' },
        { e: '📬', label: 'Alarm Handling', val: 'MQTT messages matched to service nodes in real time' },
        { e: '🔄', label: 'Dynamic Updates', val: 'Route recalculated upon arrival of new bin alarms' },
      ]
    },
    dashboard: {
      icon: '📊',
      title: 'Web Dashboard',
      sub: 'MQTT Broker · Real-Time Monitoring · Centralized Control',
      text: `
  <p>The <strong>MQTT broker</strong> acts as the communication backbone between ESP32-based smart bins, the web dashboard, and the ROS Noetic task management system.</p>
  <p>The <strong>web dashboard</strong> displays bin fullness level, weight, distance sensor readings, and alarm status in real time.</p>
  <p>This interface allows users to monitor the bin network, observe incoming MQTT messages, and understand which bins are selected for autonomous collection.</p>
        <div class="detail-chips">
          <span class="chip">MQTT Broker</span>
          <span class="chip">Real-Time Updates</span>
          <span class="chip">Bin Status</span>
          <span class="chip">Sensor Readings</span>
        </div>
      `,
      specs: [
        { e: '📡', label: 'Protocol', val: 'MQTT publish-subscribe for ultra-low-latency messaging' },
        { e: '🖥️', label: 'Dashboard', val: 'Web UI visualizing live bin status and sensor data' },
        { e: '🔔', label: 'Alerts', val: 'Instant fullness notifications routed to ROS2 system' },
        { e: '📈', label: 'Monitoring', val: 'MQTT message logs and communication diagnostics' },
      ]
    },
    media: {
      icon: '🎬',
      title: 'Media & Demos',
      sub: 'Project Videos · GitHub Repository · Documentation',
      text: `
        <p>The project includes a comprehensive set of <strong>demonstration materials</strong> showcasing the robot in action — from bin detection tests to full autonomous navigation runs on the campus environment.</p>
        <p>All source code, ROS packages, firmware, and documentation are available in the <strong>public GitHub repository</strong>, making the project fully open and reproducible.</p>
        <p>Scan the QR codes on the poster to access the <strong>GitHub repository</strong> and the <strong>media showcase</strong> directly, or follow the links below to explore the technical implementation in detail.</p>
        <div class="detail-chips">
          <span class="chip">GitHub</span>
          <span class="chip">Demo Videos</span>
          <span class="chip">Open Source</span>
          <span class="chip">Documentation</span>
        </div>
      `,
      specs: [
        { e: '💻', label: 'Source Code', val: 'Full ROS packages, ESP32 firmware, and web dashboard on GitHub' },
        { e: '🎥', label: 'Demo Videos', val: 'Navigation tests, bin detection demos, and system integration' },
        { e: '📄', label: 'Documentation', val: 'Setup guides, architecture diagrams, and API references' },
        { e: '🏫', label: 'Institution', val: 'Hacettepe University, Computer Engineering Department' },
      ]
    }
  };
  
  function openDetail(id, card) {
    const d = details[id];
    const panel = document.getElementById('detail-panel');
  
    // Toggle off if same card clicked again
    if (panel.classList.contains('open') && panel.dataset.current === id) {
      closeDetail();
      return;
    }
  
    document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  
    document.getElementById('d-icon').textContent = d.icon;
    document.getElementById('d-title').textContent = d.title;
    document.getElementById('d-sub').textContent = d.sub;
    document.getElementById('d-text').innerHTML = d.text;
  
    const specsEl = document.getElementById('d-specs');
    specsEl.innerHTML = d.specs.map(s => `
      <div class="spec-item">
        <div class="spec-emoji">${s.e}</div>
        <div>
          <div class="spec-label">${s.label}</div>
          <div class="spec-val">${s.val}</div>
        </div>
      </div>
    `).join('');
  
    panel.dataset.current = id;
    panel.classList.add('open');
  
    // Scroll to panel
    setTimeout(() => panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
  }
  
  function closeDetail() {
    const panel = document.getElementById('detail-panel');
    panel.classList.remove('open');
    delete panel.dataset.current;
    document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
  }
  
  // Drag to scroll
  const track = document.getElementById('scrollTrack');
  let isDown = false, startX, scrollLeft;
  track.addEventListener('mousedown', e => { isDown = true; startX = e.pageX - track.offsetLeft; scrollLeft = track.scrollLeft; });
  track.addEventListener('mouseleave', () => isDown = false);
  track.addEventListener('mouseup', () => isDown = false);
  track.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    track.scrollLeft = scrollLeft - (x - startX) * 1.2;
  });