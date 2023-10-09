import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, Observer} from "rxjs";

@Injectable()
export class QuizService {

  private url = 'http://localhost:8080'

  constructor(private httpClient: HttpClient) {}

  getExistingQuizzes(): Observable<ExistedQuizzes[]> {
    return this.httpClient.get<ExistedQuizzes[]>(this.url + '/api/quiz/type')
  }

  createQuiz(newType: CreateQuiz): Observable<void> {
    return this.httpClient.put<void>(this.url + '/api/quiz/type', newType)
  }

  getQuestionsForQuiz(quizId: number): Observable<Question[]> {
    return this.httpClient.get<Question[]>(this.url + `/api/quiz/question/list/${quizId}`)
  }

  createQuestion(question: Question): Observable<CreationResultDto> {
    return this.httpClient.put<CreationResultDto>(this.url + '/api/quiz/question', question);
  }

  getCommonObserver<T>(onNext: (res: T) => void, onError: (error: ErrorDto) => void, onComplete: () => void): Observer<T> {
    return {
      next: onNext,
      error: (error: HttpErrorResponse) => {
        const errorDto = error.error as ErrorDto;
        onError(errorDto);
      },
      complete: onComplete
    }
  }
}

export interface ExistedQuizzes {
  id: number,
  name: string
}

export interface CreateQuiz {
  type: string
}

export interface ErrorDto {
  message: string
}

export interface Answer {
  text: string,
  correct: boolean
}

export interface Question {
  quizId?: number,
  id?: number,
  text: string,
  answers: Answer[]
}

export interface CreationResultDto {
  id: number;
}
