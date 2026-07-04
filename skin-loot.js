// skin-loot.js
// Sets up the 3D Minecraft skin viewer that replaced the old cardboard-box
// model-viewer. Loaded as a <script type="module"> because skinview3d only
// ships as an ES module now (no more global "skinview3d" bundle).
//
// The loot-reveal interaction (dblclick to spread the items) already lives
// in script.js and targets ".loot-box" — this canvas has that class, so
// it's handled automatically. This file ONLY owns the 3D viewer.

import { SkinViewer, IdleAnimation } from "https://esm.run/skinview3d";

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('skin_container');
  if (!canvas) return;

  const skinViewer = new SkinViewer({
    canvas: canvas,
    width: 500,
    height: 500,
    skin: 'myskin.png' // <- rename/path this to wherever you keep the skin
  });

  skinViewer.zoom = 0.9;
  skinViewer.autoRotate = true;
  skinViewer.animation = new IdleAnimation();
});