import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, MenuController } from '@ionic/angular';
// import { AuthServiceService } from '../services/auth-service.service'; // Comentado temporalmente

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: string = '';
  contrasena: string = '';

  constructor(
    private navCTRL: NavController,
    private alertController: AlertController,
    private menu: MenuController,
    // private authService: AuthServiceService // Comentado temporalmente
  ) {}

  ngOnInit() {
    this.menu.close(); // Cierra el menú al inicializar la página
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async login() {
    // Validar el usuario
    if (!this.validarUsuario(this.usuario)) {
      this.mostrarAlerta(
        'El usuario debe tener entre 3 y 8 caracteres alfanuméricos.'
      );
      return;
    }

    // Validar la contraseña
    if (!this.contrasena) { 
      this.mostrarAlerta('La contraseña no puede estar vacía.');
      return;
    }

    if (!this.validarPassword(this.contrasena)) {
      this.mostrarAlerta('La contraseña debe ser de 4 dígitos numéricos.');
      return;
    }

    try {
      // Llama al servicio para verificar las credenciales
      // const loginExitoso = await this.authService.loginUser(this.usuario, this.contrasena); // Comentado temporalmente

      // Simulación de éxito en el login (puedes quitar el comentario y volver a usar el servicio cuando esté listo)
      const loginExitoso = true; // Eliminar esta línea cuando se retome el uso de AuthServiceService

      if (loginExitoso) {
        // Guarda los datos en el localStorage
        localStorage.setItem('usuario', this.usuario);
        // Navegar a la página de inicio si el login es exitoso
        this.menu.close();
        this.navCTRL.navigateForward(['/home'], {
          queryParams: {
            usuario: this.usuario,
          },
        });
      } else {
        this.mostrarAlerta('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      this.mostrarAlerta('Ocurrió un error al iniciar sesión. Inténtalo de nuevo.');
    }
  }

  // Método para ir a la página de registro
  irARegistro() {
    this.menu.close(); // Cierra el menú al ir a registro
    this.navCTRL.navigateForward('/registro');
  }

  private validarUsuario(usuario: string): boolean {
    const pattern = /^[a-zA-Z0-9]{3,8}$/;
    return pattern.test(usuario);
  }

  private validarPassword(contrasena: string): boolean {
    const pattern = /^\d{4}$/; // Debe ser un número de 4 dígitos
    return pattern.test(contrasena);
  }
}
