
    <script>
    import { useRouter } from 'vue-router';

    export default {
      setup() {
        const router = useRouter();

        const goToLogin = () => {
          router.push('/login'); 
        };

        return {
          goToLogin,
        };
      },
    };
    </script>

    