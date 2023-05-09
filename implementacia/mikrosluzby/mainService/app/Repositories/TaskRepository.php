<?php

namespace App\Repositories;

use App\Models\Task;
use Illuminate\Support\Str;
use App\Helpers\UploadHelper;
use App\Interfaces\CrudInterface;
use App\Models\Product;
use App\Models\User;
use Illuminate\Contracts\Pagination\Paginator;
use Illuminate\Support\Facades\Auth;

class TaskRepository implements CrudInterface
{
    /**
     * Authenticated User Instance.
     *
     * @var User
     */
    public User | null $user;

    /**
     * Constructor.
     */
    public function __construct()
    {
        $this->user = Auth::guard()->user();
    }

    /**
     * Get All Tasks.
     *
     * @return collections Array of Task Collection
     */
    public function getAll()
    {
//        return $this->user->tasks()
//            ->orderBy('id', 'desc')
//            ->with('user')
//            ->paginate(10);

        return Task::orderBy('id', 'desc')->get();
    }

    /**
     * Get Paginated Task Data.
     *
     * @param int $pageNo
     * @return collections Array of Task Collection
     */
    public function getPaginatedData($perPage): Paginator
    {
        $perPage = isset($perPage) ? intval($perPage) : 12;
        return Task::orderBy('id', 'desc')
            ->with('user')
            ->paginate($perPage);
    }

//    /**
//     * Get Searchable Task Data with Pagination.
//     *
//     * @param int $pageNo
//     * @return collections Array of Task Collection
//     */
//    public function searchTask($keyword, $perPage): Paginator
//    {
//        $perPage = isset($perPage) ? intval($perPage) : 10;
//
//        return Product::where('title', 'like', '%' . $keyword . '%')
//            ->orWhere('description', 'like', '%' . $keyword . '%')
//            ->orWhere('price', 'like', '%' . $keyword . '%')
//            ->orderBy('id', 'desc')
//            ->with('user')
//            ->paginate($perPage);
//    }

    /**
     * Create New Task.
     *
     * @param array $data
     * @return object Task Object
     */
    public function create(array $data): Task
    {
//        $data['user_id'] = $this->user->id;
        return Task::create($data);
    }

    /**
     * Delete Task.
     *
     * @param int $id
     * @return boolean true if deleted otherwise false
     */
    public function delete(int $id): bool
    {
        $task = Task::find($id);
        if (empty($task)) {
            return false;
        }

        $task->delete($task);
        return true;
    }

    /**
     * Get Task Detail By ID.
     *
     * @param int $id
     * @return void
     */
    public function getByID(int $id): Task|null
    {
        return Task::find($id);
    }

    /**
     * Update Task By ID.
     *
     * @param int $id
     * @param array $data
     * @return object Updated Task Object
     */
    public function update(int $id, array $data): Task|null
    {
        $task = Task::find($id);

        if (is_null($task)) {
            return null;
        }

        // If everything is OK, then update.
        $task->update($data);

        // Finally return the updated task.
        return $this->getByID($task->id);
    }
}
