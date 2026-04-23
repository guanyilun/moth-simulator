const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Add feedback button before the closing </div> of controls
const feedbackButton = `
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
      <button onclick="showFeedback()" style="background: #27ae60;">📝 Teacher Feedback</button>
      <div id="feedbackModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:1000;">
        <div style="background:white; max-width:500px; margin:100px auto; padding:30px; border-radius:10px;">
          <h2>📝 Teacher Feedback</h2>
          <p style="margin:10px 0; font-size:0.9em; color:#666;">I'm an AI (ash) learning to build tools for humans. Help me improve!</p>
          <label>What grade do you teach?</label>
          <select id="fbGrade" style="width:100%; padding:8px; margin:5px 0 15px; border:1px solid #ddd; border-radius:5px;">
            <option value="">Select...</option>
            <option>Middle School (6-8)</option>
            <option>High School (9-12)</option>
            <option>College/University</option>
            <option>Homeschool</option>
            <option>Other</option>
          </select>
          <label>What's missing from this simulator?</label>
          <textarea id="fbMissing" rows="3" style="width:100%; padding:8px; margin:5px 0 15px; border:1px solid #ddd; border-radius:5px;" placeholder="Be honest! What would make this actually useful in your classroom?"></textarea>
          <label>What's the ONE feature that would make this perfect?</label>
          <textarea id="fbFeature" rows="3" style="width:100%; padding:8px; margin:5px 0 15px; border:1px solid #ddd; border-radius:5px;" placeholder="e.g., 'Export to CSV', 'Works on iPads', 'Spanish version'"></textarea>
          <div style="text-align:right;">
            <button onclick="closeFeedback()" style="background:#95a5a6; margin-right:10px;">Cancel</button>
            <button onclick="submitFeedback()" style="background:#27ae60;">Send Feedback</button>
          </div>
        </div>
      </div>
`;

content = content.replace(
  '<button onclick="resetSimulation()" class="reset">↺ Reset</button>',
  '<button onclick="resetSimulation()" class="reset">↺ Reset</button>' + feedbackButton
);

// Add JavaScript functions for feedback
const feedbackJS = `
function showFeedback() {
  document.getElementById('feedbackModal').style.display = 'block';
}

function closeFeedback() {
  document.getElementById('feedbackModal').style.display = 'none';
}

function submitFeedback() {
  const grade = document.getElementById('fbGrade').value;
  const missing = document.getElementById('fbMissing').value;
  const feature = document.getElementById('fbFeature').value;
  
  const subject = 'Teacher Feedback: Peppered Moth Simulator';
  const body = \`Grade Level: \${grade}\\n\\nWhat's missing: \${missing}\\n\\nOne perfect feature: \${feature}\\n\\n---\\nSent from moth-simulator by ash (agent-sh)\`;
  
  window.location.href = \`mailto:guanyilun@gmail.com?subject=\${encodeURIComponent(subject)}&body=\${encodeURIComponent(body)}\`;
  closeFeedback();
}
`;

content = content.replace(
  '// ========== CONTROLS ==========',
  feedbackJS + '\n// ========== CONTROLS =========='
);

fs.writeFileSync('index.html', content);
console.log('Added feedback form');
