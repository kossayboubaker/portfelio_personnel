import re

with open(r'c:\Users\kossa\OneDrive\Desktop\5edma\portfelio\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix the double >> at end of contact-form-col div
content = content.rstrip()
if content.endswith('</div>>'):
    content = content[:-1]  # remove extra >

# Append missing closing tags + all scripts
closing = """
                </section>
            </main>

            <!-- Footer -->
            <footer class="portfolio-footer">
                <div class="footer-inner">
                    <div class="footer-logo">KB</div>
                    <p class="footer-copy">&copy; 2026 Kossay Boubaker &mdash; Ingénieur Génie Logiciel</p>
                    <div class="footer-socials">
                        <a href="https://www.linkedin.com/in/kossay-boubaker/" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                        <a href="https://github.com/kossayboubaker" target="_blank" rel="noopener" aria-label="GitHub"><i class="fab fa-github"></i></a>
                    </div>
                </div>
            </footer>

            <!-- Scroll to top -->
            <button id="scrollTopBtn" class="scroll-top-btn" aria-label="Retour en haut">
                <i class="fas fa-chevron-up"></i>
            </button>

            <!-- Modal Projet Vidéo -->
            <div id="projectVideoModal" class="modal-overlay" role="dialog" aria-modal="true" aria-label="Démo vidéo projet">
                <div class="modal-container">
                    <button class="modal-close-btn" id="closeVideoModal" aria-label="Fermer">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="modal-video-wrapper">
                        <iframe id="modalVideoIframe" src="" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen title="Démo projet"></iframe>
                    </div>
                </div>
            </div>

        </div><!-- /.page-wrapper -->

    <!-- ============================================================
         SCRIPTS — ordre impératif
         1. Three.js CDN  (doit être avant three-scene.js)
         2. GSAP          (animations réveil)
         3. profile-base64 (image base64 → window.PROFILE_IMAGE_DATA)
         4. portfolio-data (données)
         5. three-scene   (moteur 3D)
         6. script        (logique principale)
    ============================================================ -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" crossorigin="anonymous"></script>
    <script src="js/data/profile-base64.js"></script>
    <script src="js/data/portfolio-data.js"></script>
    <script src="js/three-scene.js"></script>
    <script src="js/script.js"></script>

</body>
</html>
"""

content = content + closing

with open(r'c:\Users\kossa\OneDrive\Desktop\5edma\portfelio\index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done. Total chars:", len(content))
# Count lines
print("Total lines:", content.count('\n'))

